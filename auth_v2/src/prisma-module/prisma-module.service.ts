import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaModuleService extends PrismaClient {
	constructor(config: ConfigService) {
		super({ // super is used to call the constructor of the parent class, which in this case is the PrismaClient class
			// here we pass the DATABASE_URL value to the PrismaClient constructor
			datasources: {
				db: {
					url: config.get('DATABASE_URL'),
				},
			},
		});
		console.log(config.get('DATABASE_URL'));
	}
}

// In all this code we are using the ConfigService to get the DATABASE_URL value from the .env file and pass it to the PrismaClient constructor.
// super is used to call the constructor of the parent class, which in this case is the PrismaClient class.