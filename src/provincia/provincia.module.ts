import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { Provincia } from './provincia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
  exports: [TypeOrmModule],
})
export class ProvinciaModule {}