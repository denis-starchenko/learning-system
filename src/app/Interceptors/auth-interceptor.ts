import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from "../services/auth.service";
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.getAuthorizationToken();

    if (req.url.includes('/login') || req.url.includes('/register')) {
      return next.handle(req);
    } else if (authToken){
      const authReq = req.clone({setHeaders: {'token': authToken}});
      return next.handle(authReq);
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
