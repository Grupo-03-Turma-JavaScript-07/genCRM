import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'tb_servicos' })
export class Servico {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 100, nullable: false })
  @ApiProperty({
    example: 'GenFitness',
    description: 'Nome do projeto',
    required: true,
  })
  nome: string;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 1000, nullable: false })
  @ApiProperty({
    example:
      'Academia Gaviões solicitou um software para gerenciar treinos dos seus alunos',
    description: 'Um breve resumo do projeto',
    required: true,
  })
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @ApiProperty({
    example: '1000,00',
    description: 'Valor combinado para o projeto',
    required: true,
  })
  valor: number;

  @IsNotEmpty()
  @IsString()
  @Column({ length: 50, nullable: false })
  @ApiProperty({
    example: 'Ativo',
    description:
      'Status em que se encontra o projeto, ativo/finalizado/pendente',
    required: true,
  })
  status: string;

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
