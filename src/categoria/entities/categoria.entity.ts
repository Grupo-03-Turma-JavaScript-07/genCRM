import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Servico } from '../../servico/entities/servico.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false, unique: true })
  @ApiProperty({
    example: 'manutenção',
    description:
      'Nome da categoria (valores comuns: manutenção, software, website, consultoria)',
    required: true,
  })
  nome: string;

  @ApiProperty({
    type: () => Servico,
    isArray: true,
    description: 'Lista de serviços vinculados a esta categoria',
  })
  @OneToMany(() => Servico, (servico) => servico.categoria)
  servico: Servico[];
}
