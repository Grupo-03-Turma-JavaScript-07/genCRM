import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { ServicoController } from './controllers/servico.controller';
import { Servico } from './entities/servico.entity';
import { ServicoService } from './services/servico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Servico]),
    CategoriaModule,
    UsuarioModule,
  ],
  providers: [ServicoService],
  controllers: [ServicoController],
  exports: [],
})
export class ServicoModule {}
