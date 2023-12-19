import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() //  allow to inject the JwtStrategy class into other classes but also to inject other classes into the JwtStrategy class
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt',) { // here we use 'jwt' as the name of the strategy
	constructor(config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.get('JWT_SECRET'),
		});
	}

	validate(payload: any) { // we use the validate method to extract the payload from the token this function is used by the guard
		return payload;
	}
}

// the goal of jwtStrategy is to verify the token and extract the payload from the token