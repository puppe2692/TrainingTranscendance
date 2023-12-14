import { Injectable } from "@nestjs/common";
import { PrismaModuleService } from "src/prisma-module/prisma-module.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable({})
export class AuthService {
	constructor(private prismaService: PrismaModuleService) {}
	signin() {
		return { msg:"I am signed in"};
	}

	signup(dto:AuthDto) {
		return { msg:"I am signed up"};
	}
}