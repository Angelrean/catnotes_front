import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/schedule.service';



@Component({
  selector: 'app-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: ['./edit-subject-modal.component.scss'],
})
export class EditSubjectModalComponent {
  @Input() subjectData: any = {
    subjectName: '',
    location: '',
    start: '', // Inicializar como cadena vacía
    end: '',   // Inicializar como cadena vacía
    reminders: [],
  };

  constructor(
    private readonly modalController: ModalController,
    private readonly scheduleService: ScheduleService,
    private readonly alertController: AlertController
  ) {}


  trackByIndex(index: number, item: any): number {
    return index; // Usa el índice como referencia para evitar redibujos innecesarios
  }



  updateReminder(event: any, index: number) {
    const value = event.detail?.value; // Asegúrate de extraer correctamente el valor
    if (value !== undefined) {
      this.subjectData.reminders[index] = value; // Modifica directamente
    }
  }

  removeReminder(index: number) {
    this.subjectData.reminders.splice(index, 1); // Elimina el recordatorio directamente
  }



  // Guardar cambios (crear o actualizar)
  saveSubject() {
    console.log("Data to edit: ", this.subjectData);

    if (this.subjectData._id) {
      // Actualizar un subject existente
      this.scheduleService.updateSubject(this.subjectData._id, this.subjectData).subscribe(
        (response: any) => {
          console.log('Subject updated:', response);
          this.modalController.dismiss(true); // Indicar que hubo cambios
        },
        (error: any) => {
          this.ErrorAlert()

          console.error('Error updating subject:', error);
        }
      );
    } else {
      // Crear un nuevo subject
      this.scheduleService.createSubject('scheduleId_placeholder', this.subjectData).subscribe(
        (response: any) => {
          console.log('Subject created:', response);
          this.modalController.dismiss(true); // Indicar que hubo cambios
        },
        (error: any) => {
          this.ErrorAlert()

          console.error('Error creating subject:', error);
        }
      );
    }
  }

  deleteSubject(){
    this.scheduleService.deleteSubject(this.subjectData._id).subscribe(
      (response: any) => {
        console.log('Subject deleted:', response);
        this.modalController.dismiss(true); // Indicar que hubo cambios
      },
      (error: any) => {
        console.error('Error deleting subject:', error);
      }
    );
  }

  // Cerrar el modal sin guardar cambios
  closeModal() {
    this.modalController.dismiss(false);
  }

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Lo siento...',
      subHeader: 'Ha sucedio un error inesperado',
      message: 'Revisa los campos y vuelve a guardarlo',
      buttons: ['OK']
    });

    await alert.present();
  }
}
