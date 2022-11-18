import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacturaDto } from '../storage/databases/mysql/entities/dtos/factura.dto';

export class ResponseFacturaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return data.map((factura: FacturaDto) =>
            factura.clienteCorreo === undefined ||
            factura.clienteCorreo === null
              ? { ...factura, clienteCorreo: 'Indefinido' }
              : factura,
          );
        }
        return data.clienteCorreo === undefined || data.clienteCorreo === null
          ? { ...data, clienteCorreo: 'Indefinido' }
          : data;
      }),
    );
  }
}
