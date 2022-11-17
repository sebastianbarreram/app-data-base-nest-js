import { FacturaDetalleDto } from 'src/modules/detalle-factura/storage/dtos/factura-detalle.dto';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FacturaEntity } from '../../../../../factura/storage/databases/mysql/entities/factura.entity';

@Index('fk_tbl_detalle_factura_tbl_factura', ['facturaId'], {})
@Entity('tbl_detalle_factura', { schema: 'facturacion' })
export class DetalleFacturaEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'dtl_id' })
  id: number;

  @Column('int', { name: 'factura_id', unsigned: true })
  facturaId: number;

  @Column('varchar', { name: 'dtl_producto', length: 300 })
  producto: string;

  @Column('int', { name: 'dtl_cantidad', default: () => "'0'" })
  cantidad: number;

  @Column('bigint', { name: 'dtl_precio' })
  precio: number;

  @Column('bigint', { name: 'dtl_total', default: () => "'0'" })
  total: number;

  @ManyToOne(
    () => FacturaEntity,
    (facturaEntity) => facturaEntity.detalleFactura,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'id' }])
  factura: FacturaEntity;

  constructor(detalleFactura?: FacturaDetalleDto) {
    if (detalleFactura?.producto) this.producto = detalleFactura?.producto;
    if (detalleFactura?.cantidad) this.cantidad = detalleFactura?.cantidad;
    if (detalleFactura?.precio) this.precio = detalleFactura?.precio;
    if (detalleFactura?.total) this.total = detalleFactura?.total;
  }
}
