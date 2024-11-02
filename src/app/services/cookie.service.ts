import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  getToken(){
    return Cookies.get()
  }

  setToken(token: string){
    Cookies.set('auth_token', token , { expires: 365 })

  }
}
