import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Empleados')
@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Get()
  @ApiQuery({ name: 'nombre', required: false })
  @ApiQuery({ name: 'codigo', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('nombre') nombre?: string,
    @Query('codigo') codigo?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.empleadoService.findAll(
      nombre,
      codigo,
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
    );
  }

  @Get('reporte')
  reporte() {
    return this.empleadoService.reporte();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateEmpleadoDto) {
    return this.empleadoService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmpleadoDto) {
    return this.empleadoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  }
}