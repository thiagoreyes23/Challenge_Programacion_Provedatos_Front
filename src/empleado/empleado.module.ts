import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';
import { Empleado } from './empleado.entity';
import { FotoController } from './foto.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empleado]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [EmpleadoController, FotoController],
  providers: [EmpleadoService],
  exports: [TypeOrmModule],
})
export class EmpleadoModule {}