import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuardFactura implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const header = context.getArgs()[2].req.headers.authorization; //GraphQL header authorization
    // const header = context.switchToHttp().getRequest().headers.authorization; //Este aplica para http request por ej con postman
    if (header) {
      const authorization = header.split(' ')[1];
      const key =
        '99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec';
      if (authorization != undefined && authorization == key) {
        return true;
      }
    }
    return false;
  }
}
