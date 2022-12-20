import { FacturaDto } from '../../../factura/storage/databases/mysql/entities/dtos/factura.dto';
import { Field, Int, InputType } from '@nestjs/graphql';
@InputType()
export class FacturaDetalleDto {
  @Field(() => String)
  producto: string;

  @Field(() => Int)
  cantidad: number;

  @Field(() => Int)
  precio: number;

  @Field(() => Int)
  total: number;

  @Field(() => FacturaDto, { nullable: true })
  factura: FacturaDto;
}
