import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico) //importar Entity
    private servicoRepository: Repository<Servico>,
    private CategoriaService: CategoriaService, //importar
  ) {}

  async findAll(): Promise<Servico[]> {
    return await this.servicoRepository.find({
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async findById(id: number): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });

    if (!servico)
      throw new HttpException('Serviço não encontrado!', HttpStatus.NOT_FOUND);

    return servico;
  }

  async findAllByNome(nome: string): Promise<Servico[]> {
    return await this.servicoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
        usuario: true,
      },
    });
  }

  async create(servico: Servico): Promise<Servico> {
    await this.CategoriaService.findById(servico.categoria.id);
    return await this.servicoRepository.save(servico);
  }

  async update(servico: Servico): Promise<Servico> {
    await this.findById(servico.id);

    await this.CategoriaService.findById(servico.categoria.id);

    return await this.servicoRepository.save(servico);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.servicoRepository.delete(id);
  }
}
