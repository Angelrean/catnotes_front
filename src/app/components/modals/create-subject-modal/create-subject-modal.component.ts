import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { ScheduleService } from 'src/app/services/schedule.service';


@Component({
  selector: 'app-create-subject-modal',
  templateUrl: './create-subject-modal.component.html',
  styleUrls: ['./create-subject-modal.component.scss'],
})
export class CreateSubjectModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Output() subjectCreated = new EventEmitter<any>();

  subjectData = {
    subjectName: '',
    location: '',
    start: '',
    end: '',
    reminders: [],
  };

  constructor(private scheduleService: ScheduleService) {}

  // Método para abrir el modal
  openModal() {
    this.modal.present();
  }

  // Método para cerrar el modal
  closeModal() {
    this.modal.dismiss();
  }

  // Crear un nuevo subject
  createSubject() {
    this.scheduleService.createSubject('scheduleId_placeholder', this.subjectData).subscribe(
      (response : any) => {
        this.subjectCreated.emit(response);
        this.closeModal();
      },
      (error : any) => {
        console.error('Error creating subject:', error);
      }
    );
  }

  // Agregar un reminder
  addReminder() {
    this.subjectData.reminders.push();
  }

  // Eliminar un reminder
  removeReminder(index: number) {
    this.subjectData.reminders.splice(index, 1);
  }
}
