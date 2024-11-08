import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from '../services/cookie.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectamos Router
  const cookieService = inject(CookieService); // Inyectamos CookieService

  const token = cookieService.getToken();
  console.log('Token in guard:', token);

  // Validación del token como string y formato correcto
  if (token && typeof token === 'string' && token.includes('.')) {

    const payload = JSON.parse(atob(token.split('.')[1]));


    const isExpired = Date.now() >= payload.exp * 1000;

    if (!isExpired) {
      return true; // Token válido, acceso permitido
    }
  }

  // Token no válido o expirado, redirie al login
  router.navigate(['/login']);
  return false;
};
