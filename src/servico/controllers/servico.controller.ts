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

  @Get('servicos/:usuario')
  @HttpCode(HttpStatus.OK)
  qtdServicosByUsuario(
    @Param('usuario', ParseIntPipe) usuario: number,
  ): Promise<number> {
    return this.servicoService.qtdServicosByUsuario(usuario);
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

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  status(@Param('id', ParseIntPipe) id: number): Promise<Servico> {
    return this.servicoService.status(id);
  }

  @Put('/desconto/:id')
  @HttpCode(HttpStatus.OK)
  descontoCupom(@Param('id', ParseIntPipe) id: number): Promise<Servico> {
    return this.servicoService.descontoCupom(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.servicoService.delete(id);
  }
}
