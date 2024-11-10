import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectamos Router
  const cookieService = inject(CookieService); // Inyectamos CookieService

  const payload = cookieService.getTokenPayload();

  if (payload == '') {
    return false
  }

  const isExpired = Date.now() >= payload.exp * 1000;

  console.log('Payload:', payload);
  console.log('Is Expired:', isExpired);
  if (!isExpired) {
    return true; // Token válido, acceso permitido
  }

  // Token no válido o expirado, redirie al login
  cookieService.removeToken()
  router.navigate(['/login']);
  return false;
};
