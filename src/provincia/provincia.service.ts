import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from './provincia.entity';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
  ) {}

  findAll(): Promise<Provincia[]> {
    return this.provinciaRepository.find({
      order: { nombre_provincia: 'ASC' },
    });
  }

  findOne(id: number): Promise<Provincia | null> {
    return this.provinciaRepository.findOne({
      where: { id_provincia: id },
    });
  }
}