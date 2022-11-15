import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Entity } from 'typeorm';
import { DetalleFacturaEntity } from './entities/detalle-factura.entity';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async create(factura: FacturaEntity): Promise<FacturaEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newFactura = await queryRunner.manager.save(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar una factura',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAllFacturas(): Promise<FacturaEntity[]> {
    // return await this.dataSource.getRepository(FacturaEntity).find({
    //   relations: {
    //     detalleFactura: true,
    //   },
    // });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const facturas = await queryRunner.manager.find(FacturaEntity, {
      relations: {
        detalleFactura: true,
      },
    });
    return Promise.resolve(facturas);
  }

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

  async getFacturaById(id: string): Promise<FacturaEntity> {
    // return await this.dataSource.getRepository(FacturaEntity).findOne({
    //   where: {
    //     id: Number(id),
    //   },
    //   relations: {
    //     detalleFactura: true,
    //   },
    // });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const factura = await queryRunner.manager.findOne(FacturaEntity, {
      where: {
        id: Number(id),
      },
      relations: {
        detalleFactura: true,
      },
    });
    if (factura == null) {
      throw new HttpException(
        `Factura con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    return Promise.resolve(factura);
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

  // async deleteFactura(id: string) {
  //   const deleteFactura = await this.dataSource
  //     .getRepository(FacturaEntity)
  //     .delete(id);
  //   console.log(deleteFactura);
  //   return true;
  // }
  async deleteFactura(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const factura = await this.getFacturaById(id);
    try {
      await queryRunner.manager.remove(factura.detalleFactura);
      await queryRunner.manager.remove(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(true);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para eliminar una factura' + err,
        HttpStatus.CONFLICT,
      );
    }
  }

  async deleteDetallefactura(id: string) {
    await this.getDetalleFacturaById(id);
    await this.dataSource.getRepository(DetalleFacturaEntity).delete(id);
    return true;
  }

  async updateFactura(id: string, updateFactura: FacturaEntity) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const factura = await this.getFacturaById(id);
      factura.clienteNombre = updateFactura.clienteNombre;
      factura.clienteCorreo = updateFactura.clienteCorreo;
      factura.detalleFactura = updateFactura.detalleFactura;
      const newFactura = await queryRunner.manager.save(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para actualizar una factura',
        HttpStatus.CONFLICT,
      );
    }
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
