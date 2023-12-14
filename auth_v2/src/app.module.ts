import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModuleModule } from './prisma-module/prisma-module.module';

@Module({
	imports: [AuthModule, UserModule, BookmarkModule, PrismaModuleModule],
})
export class AppModule {}
