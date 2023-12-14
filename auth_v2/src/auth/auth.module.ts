import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { PrismaModuleModule } from 'src/prisma-module/prisma-module.module';

@Module({
	//imports: [PrismaModuleModule], // import the PrismaModuleModule
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
