import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getToken(): string{
    return Cookies.get('auth_token') || ''
  }

  setToken(token: string){
    Cookies.set('auth_token', token , { expires: 365 })

  }

  removeToken(){
    Cookies.remove('auth_token')
  }
}
