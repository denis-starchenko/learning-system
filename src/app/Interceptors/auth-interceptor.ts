import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    } else {
      const authToken = this.auth.getAuthorizationToken();
      const authReq = req.clone({setHeaders: {'token': authToken}});
      return next.handle(authReq);
    }
  }
}
