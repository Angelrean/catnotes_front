import { Injector } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';

export function CheckNetworkConnection() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Obtener el estado de la red
      const status = await Network.getStatus();

      // Si no hay conexión, mostrar una alerta
      if (!status.connected) {
        const alertController: AlertController = Injector.create({providers: [{provide: AlertController, deps: []}]}).get(AlertController);
        const alert = await alertController.create({
          header: 'Conexión Perdida',
          message: 'No tienes conexión a Internet.',
          buttons: ['OK']
        });

        await alert.present();
        return; // Detener la ejecución del método si no hay conexión
      }

      // Si hay conexión, ejecutar el método original
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
