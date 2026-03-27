import { Controller, Get, Param } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Provincias')
@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  @Get()
  findAll() {
    return this.provinciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.provinciaService.findOne(+id);
  }
}