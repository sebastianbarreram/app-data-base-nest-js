import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const PipeValidator = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  skipMissingProperties: false,
  exceptionFactory: (errors: ValidationError[]) => {
    const messages = errors.map((error) => {
      let keys = new Array<string>();
      if (error.constraints) {
        keys = Object.keys(error.constraints);
      }
      const message: string[] = new Array<string>();
      if (keys.length > 1 && message instanceof Array) {
        keys.forEach((msgError) => {
          message.push(error.constraints?.[msgError] ?? '');
        });
      }
      return {
        field: error.property,
        message: message.length > 0 ? message : error.constraints?.[keys[0]],
      };
    });
    return new BadRequestException(messages);
  },
});
