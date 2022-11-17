import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './modules/main/services/app.service';
import { DetalleFacturaEntity } from './modules/detalle-factura/storage/databases/mysql/entities/detalle-factura.entity';
import { FacturaEntity } from './modules/factura/storage/databases/mysql/entities/factura.entity';
import { AppController } from './modules/main/controllers/app.controller';
import { FacturaModule } from './modules/factura/factura.module';
import { DetalleFacturaModule } from './modules/detalle-factura/detalle-factura.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'facturacion',
      entities: [FacturaEntity, DetalleFacturaEntity],
      synchronize: false,
    }),
    FacturaModule,
    DetalleFacturaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
