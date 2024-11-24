import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkGuard implements CanActivate {
  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Verificar el estado de la conexión a Internet
    const status = await Network.getStatus();

    if (!status.connected) {
      // Si no hay conexión, mostrar alerta
      const alert = await this.alertController.create({
        header: 'Sin Conexión',
        message: 'No tienes conexión a Internet.',
        buttons: ['OK'],
      });

      await alert.present();

      // Redirigir al usuario al índice (página de inicio)
      this.router.navigate(['/calendar']);

      return false; // No permitir la navegación a la ruta solicitada
    }

    return true; // Permitir la navegación si hay conexión
  }
}
