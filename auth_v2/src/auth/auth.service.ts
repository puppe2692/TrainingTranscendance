import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaModuleService } from "src/prisma-module/prisma-module.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class AuthService {
	constructor(private prismaService: PrismaModuleService) {}
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
		// if paswsword does not match, throw an error

		//send back the user
		return { msg:"I am signed in"};
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

		delete user.hash; // remove the hash from the user object
		// return the saved user
		return user;
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