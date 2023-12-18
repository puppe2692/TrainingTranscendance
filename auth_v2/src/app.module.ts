import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModuleModule } from './prisma-module/prisma-module.module';

@Module({
	imports: [
		ConfigModule.forRoot({ // here we import the ConfigModule and call the forRoot() method to load the .env file
			isGlobal: true, // here isGlobal is set to true, which makes the ConfigModule available to all other modules
		}),
		AuthModule, 
		UserModule, 
		BookmarkModule, 
		PrismaModuleModule,
	],
})
export class AppModule {}
