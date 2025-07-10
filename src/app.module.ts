import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
//import { AuthModule 
//import { ServicoModule
//import { CategoriaModule
//import { UsuarioModule
//import { ConfigModule
//import { ProdService 

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      //useClass: ProdService,
      //imports: [ConfigModule],
    }),

    ServicoModule,
    CategoriaModule,
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}