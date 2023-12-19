import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
//import { PrismaModuleModule } from 'src/prisma-module/prisma-module.module';

@Module({
	//imports: [PrismaModuleModule], // import the PrismaModuleModule
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
