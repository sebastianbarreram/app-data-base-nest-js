import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseDetalleFacturaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return data.map((detalleFactura) =>
            detalleFactura.factura.clienteCorreo === undefined ||
            detalleFactura.factura.clienteCorreo === null
              ? {
                  ...detalleFactura,
                  factura: {
                    clienteNombre: detalleFactura.factura.clienteNombre,
                    clienteCorreo: 'Indefinido',
                    id: detalleFactura.factura.id,
                  },
                }
              : detalleFactura,
          );
        }

        return data.factura.clienteCorreo === undefined ||
          data.factura.clienteCorreo === null
          ? {
              ...data,
              factura: {
                clienteNombre: data.factura.clienteNombre,
                clienteCorreo: 'Indefinido',
                id: data.factura.id,
              },
            }
          : data;
      }),
    );
  }
}
