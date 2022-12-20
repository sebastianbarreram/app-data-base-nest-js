import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FacturaEntity } from '../../../factura/storage/databases/mysql/entities/factura.entity';
import { FacturaService } from '../../../factura/services/factura.service';
import { UseInterceptors } from '@nestjs/common';
import { ResponseFacturaInterceptor } from 'src/modules/factura/interceptors/response-factura.interceptor';
import { FacturaDto } from '../../../factura/storage/databases/mysql/entities/dtos/factura.dto';

@Resolver()
export class HelloWorldResolver {
  constructor(private facturaService: FacturaService) {}

  @Query(() => String)
  helloWorld(): string {
    return 'Hello World from GraphQL';
  }

  @Query(() => String)
  helloWorld2(@Args('data', { type: () => Int }) data: number): string {
    return 'Hello World from GraphQL ' + data;
  }

  @Query(() => [FacturaEntity])
  @UseInterceptors(ResponseFacturaInterceptor)
  async getAllFacturas(): Promise<FacturaEntity[]> {
    return await this.facturaService.getAllFacturas();
  }

  @Mutation(() => FacturaEntity)
  async createFactura(
    @Args('factura', { type: () => FacturaDto })
    factura: FacturaDto,
  ): Promise<FacturaEntity> {
    const newFactura = new FacturaEntity(factura);
    return await this.facturaService.create(newFactura);
  }
}
