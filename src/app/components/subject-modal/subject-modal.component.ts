import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { IonModal } from '@ionic/angular';


import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-subject-modal',
  templateUrl: './subject-modal.component.html',
  styleUrls: ['./subject-modal.component.scss'],
})
export class SubjectModalComponent {
  @Input() subjectData: any = {}; // Datos del subject que se mostrarán o editarán
  @Input() selectedDay!: string; // Recibe el día seleccionado desde el componente padre

  @ViewChild(IonModal) modal!: IonModal;
  @Output() subjectSaved = new EventEmitter<any>();

  isModalOpen = false;
  isEditMode = false; // Se usará para alternar entre vista y edición
  isNew = false; // Para distinguir entre nuevo y edición
  editData: any = {};

  constructor(private scheduleService: ScheduleService, private datePipe: DatePipe) {}

  // Método para abrir el modal
  openModal(subject: any = null, isNew: boolean = false) {
    console.log('Opening Modal:', { subject, isNew });

    this.isModalOpen = true;
    this.isNew = isNew;
    this.isEditMode = isNew; // Si es nuevo, abrir en modo edición automáticamente

    if (isNew) {
      // Modo creación: formulario vacío
      this.subjectData = {};
      this.editData = {
        subjectName: '',
        location: '',
        start: '',
        end: '',
        reminders: [],
        day: this.selectedDay, // Usa selectedDay para la creación
      };
    } else {
      // Modo edición: formulario con datos
      this.subjectData = subject;
      this.editData = { ...this.subjectData };
    }
  }

  // Método para cerrar el modal
  closeModal() {
    this.modal.dismiss();
    this.isModalOpen = false;
    this.isEditMode = false; // Reiniciar el modo edición al cerrar el modal
  }

  // Método para alternar entre modo edición y vista
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  // Método para cancelar la acción y cerrar el modal
  cancel() {
    this.closeModal();
  }

  // Método para guardar cambios
  saveChanges() {
    console.log("new data: ", this.selectedDay, this.editData);

    // Verificar si es un nuevo subject o uno existente
    if (this.isNew) {
      // Si es nuevo, se crea el subject
      this.scheduleService.createSubject(this.editData.day, this.editData).subscribe(
        (response) => {
          this.subjectSaved.emit(response);  // Emitir el subject guardado
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear el subject:', error);
        }
      );
    } else {
      // Si no es nuevo, se edita el subject
      this.scheduleService.updateSubject(this.editData.subjectId, this.editData).subscribe(
        (response) => {
          this.subjectSaved.emit(response);  // Emitir el subject actualizado
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar el subject:', error);
        }
      );
    }
  }



  // Método para agregar un nuevo reminder
  addReminder() {
    this.editData.reminders.push('');
  }

  // Método para eliminar un reminder
  removeReminder(index: number) {
    this.editData.reminders.splice(index, 1);
  }
}
