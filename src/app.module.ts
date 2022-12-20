import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './modules/main/services/app.service';
import { DetalleFacturaEntity } from './modules/detalle-factura/storage/databases/mysql/entities/detalle-factura.entity';
import { FacturaEntity } from './modules/factura/storage/databases/mysql/entities/factura.entity';
import { AppController } from './modules/main/controllers/app.controller';
import { FacturaModule } from './modules/factura/factura.module';
import { DetalleFacturaModule } from './modules/detalle-factura/detalle-factura.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { HelloWorldResolver } from './modules/main/resolvers/hello-world/hello-world.resolver';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { FacturaService } from './modules/factura/services/factura.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DB'),
        entities: [FacturaEntity, DetalleFacturaEntity],
      }),
      inject: [ConfigService],
    }),
    FacturaModule,
    DetalleFacturaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, HelloWorldResolver, FacturaService],
})
export class AppModule {}
