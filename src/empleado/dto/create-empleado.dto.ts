import { IsString, IsEmail, IsOptional, IsNumber, IsDateString, Length, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmpleadoDto {
  @ApiProperty() 
  @IsString() 
  @Length(1, 100)
  nombres: string;

  @ApiProperty() 
  @IsString() 
  @Length(1, 100)
  apellidos: string;

  @ApiProperty() 
  @IsString() 
  @Length(10, 10)
  cedula: string;

  @ApiProperty({ required: false }) 
  @IsEmail() 
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false }) 
  @IsDateString() 
  @IsOptional()
  fecha_nacimiento?: string;

  @ApiProperty({ required: false }) 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_provincia_personal?: number;

  @ApiProperty({ required: false }) 
  @IsString() 
  @IsOptional()
  observaciones_personales?: string;

  @ApiProperty({ required: false }) 
  @IsString() 
  @IsOptional()
  foto?: string;

  @ApiProperty({ required: false }) 
  @IsDateString() 
  @IsOptional()
  fecha_ingreso?: string;

  @ApiProperty({ required: false }) 
  @IsString() 
  @IsOptional()
  cargo?: string;

  @ApiProperty({ required: false }) 
  @IsString() 
  @IsOptional()
  departamento?: string;

  @ApiProperty({ required: false }) 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_provincia_laboral?: number;

  @ApiProperty({ required: false }) 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sueldo?: number;

  @ApiProperty({ required: false }) 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  jornada_parcial?: number;

  @ApiProperty({ required: false }) 
  @IsString() 
  @IsOptional()
  observaciones_laborales?: string;

  @ApiProperty({ required: false }) 
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsIn([1, 9])
  estado?: number;
}