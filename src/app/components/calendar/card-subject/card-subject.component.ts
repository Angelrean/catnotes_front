import { Component, Input, ViewChild, Output,EventEmitter } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { SubjectModalComponent } from '../../subject-modal/subject-modal.component';

@Component({
  selector: 'app-card-subject',
  templateUrl: './card-subject.component.html',
  styleUrls: ['./card-subject.component.scss'],
})
export class CardSubjectComponent {

  @Input() subjectList: any = {}

  @ViewChild(SubjectModalComponent) subjectModalComponent!: SubjectModalComponent;
  @Output() subjectClicked = new EventEmitter<any>();



  isModalOpen = false;
  subject: string = '';
  location: string = '';
  time: string = '';
  startTime: string = '';
  finishTime: string = '';
  rememberText: string = '';

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';


  openModal() {
    // Aquí llamamos al método openModal del SubjectModalComponent
    if (this.subjectModalComponent) {
      this.subjectModalComponent.openModal(this.subjectList);
    } else {
      console.error('No se pudo acceder al componente modal');
    }
  }

  closeModal() {
    this.isModalOpen = false;
    console.log("cerrado")
  }

  cancel() {
    this.subjectModalComponent.closeModal();
  }

  confirm() {
    this.subjectModalComponent.closeModal();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


}
