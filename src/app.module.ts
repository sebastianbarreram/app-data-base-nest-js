import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './modules/main/services/app.service';
import { DetalleFacturaEntity } from './modules/detalle-factura/storage/databases/mysql/entities/detalle-factura.entity';
import { FacturaEntity } from './modules/factura/storage/databases/mysql/entities/factura.entity';
import { AppController } from './modules/main/controllers/app.controller';
import { FacturaModule } from './modules/factura/factura.module';
import { DetalleFacturaModule } from './modules/detalle-factura/detalle-factura.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
