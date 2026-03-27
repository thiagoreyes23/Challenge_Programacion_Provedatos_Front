import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('provincia')
export class Provincia {
  @PrimaryGeneratedColumn()
  id_provincia: number;

  @Column({ length: 100 })
  nombre_provincia: string;

  @Column({ length: 100, nullable: true })
  capital_provincia: string;

  @Column({ type: 'text', nullable: true })
  descripcion_provincia: string;

  @Column({ length: 50, nullable: true })
  poblacion_provincia: string;

  @Column({ length: 50, nullable: true })
  superficie_provincia: string;

  @Column({ length: 20, nullable: true })
  latitud_provincia: string;

  @Column({ length: 20, nullable: true })
  longitud_provincia: string;

  @Column({ nullable: true })
  id_region: number;
}