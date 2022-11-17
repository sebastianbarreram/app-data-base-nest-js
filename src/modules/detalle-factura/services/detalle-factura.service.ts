import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DetalleFacturaEntity } from '../storage/databases/mysql/entities/detalle-factura.entity';

@Injectable()
export class DetalleFacturaService {
  constructor(private dataSource: DataSource) {}

  async getAllDetallesFacturas(): Promise<DetalleFacturaEntity[]> {
    // return await this.dataSource.getRepository(DetalleFacturaEntity).find({
    //   relations: {
    //     factura: true,
    //   },
    // });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const detalleFacturas = await queryRunner.manager.find(
      DetalleFacturaEntity,
      {
        relations: {
          factura: true,
        },
      },
    );
    return Promise.resolve(detalleFacturas);
  }

  async getDetalleFacturaById(id: string): Promise<DetalleFacturaEntity> {
    // return await this.dataSource.getRepository(DetalleFacturaEntity).findOne({
    //   where: {
    //     id: Number(id),
    //   },
    //   relations: {
    //     factura: true,
    //   },
    // });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const detallesFacturas = await queryRunner.manager.findOne(
      DetalleFacturaEntity,
      {
        where: {
          id: Number(id),
        },
        relations: {
          factura: true,
        },
      },
    );
    if (detallesFacturas == null) {
      throw new HttpException(
        `Detalle de factura con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    return Promise.resolve(detallesFacturas);
  }

  async deleteDetallefactura(id: string) {
    await this.getDetalleFacturaById(id);
    await this.dataSource.getRepository(DetalleFacturaEntity).delete(id);
    return true;
  }

  async updateDetalleFactura(
    id: string,
    updateDetalleFactura: DetalleFacturaEntity,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.dataSource
        .createQueryBuilder()
        .update(DetalleFacturaEntity)
        .set(updateDetalleFactura)
        .where('id = :id', { id: id })
        .execute();
      await queryRunner.commitTransaction();
      return Promise.resolve({ ...updateDetalleFactura, id: id });
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para actualizar el detalle de una factura',
        HttpStatus.CONFLICT,
      );
    }
  }
}
