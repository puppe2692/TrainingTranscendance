import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'; // we import the Request type from Express, request is used to get the request body, a request body is the data that is sent to the server, here we sue it to get the user object from the request object
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from '@prisma/client';

@UseGuards(JwtGuard) // here we call 'jwt' as the name of the strategy to use for the guard, we declare this strategy name in the JwtStrategy class
@Controller('users')
export class UserController {
	// now the route /users/me is protected by the jwt strategy
	@Get('me')
	getMe(@GetUser() user: User, @GetUser('email') email: string,) // Req() is a decorator that allows us to access the request object, it is from the @nestjs/common package, getMe is the name of the method
	{
		console.log({email}); // ici
		return user;
	}
}
