import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_servicos' })
export class Servico {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column({ length: 100, nullable: false })
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column({ length: 1000, nullable: false })
  descricao: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  valor: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column({ length: 50, nullable: false })
  status: string;

  @ApiProperty()
  @UpdateDateColumn()
  data: Date;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.servico, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.servico, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
