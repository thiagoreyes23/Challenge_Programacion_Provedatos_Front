import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Provincia } from '../provincia/provincia.entity';

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  id_empleado: number;

  @Column({ length: 10, unique: true })
  codigo: string;

  @Column({ length: 100 })
  nombres: string;

  @Column({ length: 100 })
  apellidos: string;

  @Column({ length: 10, unique: true })
  cedula: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: string;

  @Column({ nullable: true })
  id_provincia_personal: number;

  @Column({ type: 'text', nullable: true })
  observaciones_personales: string;

  @Column({ type: 'text', nullable: true })
  foto: string;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso: string;

  @Column({ length: 100, nullable: true })
  cargo: string;

  @Column({ length: 100, nullable: true })
  departamento: string;

  @Column({ nullable: true })
  id_provincia_laboral: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  sueldo: number;

  @Column({ type: 'tinyint', default: 0 })
  jornada_parcial: number;

  @Column({ type: 'text', nullable: true })
  observaciones_laborales: string;

  @Column({ type: 'tinyint', default: 1 })
  estado: number;

  @ManyToOne(() => Provincia)
  @JoinColumn({ name: 'id_provincia_personal' })
  provincia_personal: Provincia;

  @ManyToOne(() => Provincia)
  @JoinColumn({ name: 'id_provincia_laboral' })
  provincia_laboral: Provincia;
}