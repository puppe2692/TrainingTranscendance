import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // we import the Request type from Express, request is used to get the request body, a request body is the data that is sent to the server, here we sue it to get the user object from the request object

@Controller('users')
export class UserController {
	@UseGuards(AuthGuard('jwt')) // here we call 'jwt' as the name of the strategy to use for the guard, we declare this strategy name in the JwtStrategy class
	// now the route /users/me is protected by the jwt strategy
	@Get('me')
	getMe(@Req() req: Request) { // Req() is a decorator that allows us to access the request object, it is from the @nestjs/common package
		console.log({
			user: req.user, // here we can access the user object from the request object
		});
		return 'user info';
	}
}
