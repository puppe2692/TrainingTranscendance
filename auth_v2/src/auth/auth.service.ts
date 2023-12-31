import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaModuleService } from "src/prisma-module/prisma-module.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
	constructor(private prismaService: PrismaModuleService, 
				private jwt: JwtService,
				private config: ConfigService) {} //ConfigService is used to get the JWT_SECRET value from the .env file
	async signin(dto:AuthDto) {
		// find the user by email in the database
		const user = await this.prismaService.user.findUnique({
			where: {
				email: dto.email,
			}
		
		})
		// if the user does not exist, throw an error
		if (!user) {
			throw new ForbiddenException("Credential Incorrect")
		}
		// compare password
		const pwMatches = await argon.verify(user.hash, dto.password)
		// if paswsword does not match, throw an error
		if (!pwMatches) {
			throw new ForbiddenException("Credential Incorrect")
		}
		return this.signToken(user.id, user.email);
	}

	async signToken(userId:number, email:string): Promise<{ access_token: string }> {
		const payload = { // here payload is the data we want to store in the token
			sub:userId,// here sub is used because it is the standard for the subject of the token
			email,
		}
		const secret = this.config.get('JWT_SECRET')

		const token = await this.jwt.signAsync(payload, {expiresIn: '15m', secret: secret}) // the fonction signAsync is used to sign the token
	
		return {access_token: token,};
	}

	async signup(dto:AuthDto) {
		// generate the password hash
		const hash = await argon.hash(dto.password)
		// save the new user to the database
		try {
		const user = await this.prismaService.user.create({
			data: {
				email: dto.email,
				hash,
			},
			// select: {
			// 	id : true,
			// 	email: true,
			// 	createdAt: true,
			// } // this allows us to select only the fields we want to return
		});

		return this.signToken(user.id, user.email);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ForbiddenException("Email already exists")
				}
			}
			throw error;
		}
	}
}