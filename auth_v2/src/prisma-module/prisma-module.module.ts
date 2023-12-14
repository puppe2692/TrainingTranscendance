import { Global, Module } from '@nestjs/common';
import { PrismaModuleService } from './prisma-module.service';

@Global() // make the PrismaModuleService available to all other modules if the PrismaModuleModule exports it
@Module({
  providers: [PrismaModuleService],
  exports: [PrismaModuleService], // export the PrismaModuleService to allow other modules to import it
})
export class PrismaModuleModule {}
