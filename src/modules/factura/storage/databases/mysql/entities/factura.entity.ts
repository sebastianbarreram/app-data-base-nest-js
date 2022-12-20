import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleFacturaEntity } from '../../../../../detalle-factura/storage/databases/mysql/entities/detalle-factura.entity';
import { FacturaDto } from './dtos/factura.dto';

@Entity('tbl_factura', { schema: 'facturacion' })
@ObjectType()
export class FacturaEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'fac_id', unsigned: true })
  @Field(() => Int)
  id: number;

  @Column('varchar', { name: 'fac_cliente_nombre', length: 500 })
  @Field(() => String)
  clienteNombre: string;

  @Column('varchar', {
    name: 'fac_cliente_correo',
    nullable: true,
    length: 500,
  })
  @Field(() => String, { nullable: true })
  clienteCorreo: string | null;

  @OneToMany(
    () => DetalleFacturaEntity,
    (detalleFacturaEntity) => detalleFacturaEntity.factura,
    { cascade: ['insert'], onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @Field(() => [DetalleFacturaEntity])
  detalleFactura: DetalleFacturaEntity[];

  constructor(factura?: FacturaDto) {
    this.clienteNombre = factura?.clienteNombre ?? '';
    this.clienteCorreo = factura?.clienteCorreo ?? null;
    if (factura?.detalleFactura && factura?.detalleFactura.length > 0) {
      this.detalleFactura = new Array<DetalleFacturaEntity>();
      factura.detalleFactura.forEach((data) =>
        this.detalleFactura.push(new DetalleFacturaEntity(data)),
      );
    }
  }
}
