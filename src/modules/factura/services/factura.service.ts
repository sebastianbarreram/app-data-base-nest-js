import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FacturaEntity } from '../storage/databases/mysql/entities/factura.entity';

@Injectable()
export class FacturaService {
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
}
