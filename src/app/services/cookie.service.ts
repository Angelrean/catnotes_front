import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getToken(): string{
    return Cookies.get('auth_token') ?? ''
  }

  getTokenPayload(): any{
    const token = this.getToken();
    // Validación del token como string y formato correcto
    if (token && typeof token === 'string' && token.includes('.')) {

      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload
    }
    return ''
  }

  setToken(token: string){
    Cookies.set('auth_token', token , { expires: 365 })

  }

  removeToken(){
    Cookies.remove('auth_token')
  }
}
