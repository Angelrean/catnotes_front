import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly coockieService: CookieService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes("google.com")) {
      const token = this.coockieService.getToken();
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      // Aquí puedes realizar alguna otra acción, como mostrar un mensaje al usuario, enviar datos, etc.
    }

    return next.handle(request);
  }
}
