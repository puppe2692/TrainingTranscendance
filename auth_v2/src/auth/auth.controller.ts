import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
//import { Request } from "express"; // import the Request type from Express, request is used to get the request body, a request body is the data that is sent to the server
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto"; // we can write it like that because the index.ts file is the default file that is imported when we import a folder

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() dto:AuthDto) {
		return this.authService.signup(dto)
	}

	@Post('signin')
	signin(@Body() dto:AuthDto) {
		return this.authService.signin(dto)
	}

}