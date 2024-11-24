import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly coockieService: CookieService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(request.url.includes(environment.api_uri));

    if (request.url.includes(environment.api_uri)) {
      const token = this.coockieService.getToken();
      console.log(token);

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `${token}`
          }
        });
      }
      console.log(request);

    }
    console.log(request);

    return next.handle(request);
  }
}
