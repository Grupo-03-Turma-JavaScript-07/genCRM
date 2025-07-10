import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsUrl, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Servico } from '../../servico/entities/servico.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({
    example: 'Ana Silva de Sousa',
    description: 'Nome completo do usuário',
    required: true,
  })
  nome: string;

  @IsEmail()
  @Column({ length: 255, nullable: false, unique: true })
  @ApiProperty({
    example: 'usuario@email.com',
    required: true,
  })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty({
    example: 'senha@1234',
    description: 'Senha com mínimo 8 caracteres',
    required: true,
  })
  senha: string;

  @IsUrl()
  @Column({ length: 5000, nullable: true })
  @ApiProperty({
    example: 'https://exemplo.com/foto.jpg',
    description: 'URL da foto de perfil (opcional)',
    required: false,
  })
  foto: string;

  @ApiProperty({
    type: () => [Servico],
    description: 'Lista de serviços vinculados ao usuário',
  })
  @OneToMany(() => Servico, (servico) => servico.usuario)
  servico: Servico[];
}
