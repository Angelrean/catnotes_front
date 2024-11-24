import { Component, Input, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-view-subject-modal',
  templateUrl: './view-subject-modal.component.html',
  styleUrls: ['./view-subject-modal.component.scss'],
})
export class ViewSubjectModalComponent {
  @ViewChild(IonModal) modal!: IonModal;
  @Input() subjectData: any;

  // Método para abrir el modal
  openModal() {
    this.modal.present();
  }

  // Método para cerrar el modal
  closeModal() {
    this.modal.dismiss();
  }
}
