import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { Servico } from '../entities/servico.entity';
import { ServicoService } from '../services/servico.service';

@ApiTags('Serviço')
@UseGuards(JwtAuthGuard)
@Controller('/servicos')
@ApiBearerAuth()
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Servico[]> {
    //importar
    return this.servicoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Servico> {
    return this.servicoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllByNome(@Param('nome') nome: string): Promise<Servico[]> {
    return this.servicoService.findAllByNome(nome);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() servico: Servico): Promise<Servico> {
    return this.servicoService.create(servico);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() servico: Servico): Promise<Servico> {
    return this.servicoService.update(servico);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.servicoService.delete(id);
  }
}
