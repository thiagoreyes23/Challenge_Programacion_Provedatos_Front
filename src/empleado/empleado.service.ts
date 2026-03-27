import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Empleado } from './empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';

export interface PaginatedResult {
  data: Empleado[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,
  ) {}

  async findAll(
    nombre?: string,
    codigo?: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<PaginatedResult> {
    const where: any = {};
    if (nombre) where.nombres = Like(`%${nombre}%`);
    if (codigo) where.codigo = Like(`%${codigo}%`);

    const [data, total] = await this.empleadoRepository.findAndCount({
      where,
      relations: ['provincia_personal', 'provincia_laboral'],
      order: { apellidos: 'ASC' },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Empleado | null> {
    return this.empleadoRepository.findOne({
      where: { id_empleado: id },
      relations: ['provincia_personal', 'provincia_laboral'],
    });
  }

  async create(dto: CreateEmpleadoDto): Promise<Empleado> {
    const ultimo = await this.empleadoRepository.find({
      order: { id_empleado: 'DESC' },
      take: 1,
    });
    const numero = ultimo.length > 0 ? ultimo[0].id_empleado + 1 : 1;
    const codigo = numero.toString().padStart(5, '0');
    const empleado = this.empleadoRepository.create({ ...dto, codigo });
    return this.empleadoRepository.save(empleado);
  }

  async update(id: number, dto: UpdateEmpleadoDto): Promise<Empleado | null> {
    await this.empleadoRepository.update(id, dto as any);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.empleadoRepository.delete(id);
  }

  async reporte(): Promise<Empleado[]> {
    return this.empleadoRepository.find({
      relations: ['provincia_personal', 'provincia_laboral'],
      order: { apellidos: 'ASC' },
    });
  }
}