import { Component} from '@angular/core';

@Component({
  selector: 'app-card-subject',
  templateUrl: './card-subject.component.html',
  styleUrls: ['./card-subject.component.scss'],
})
export class CardSubjectComponent {

  isModalOpen = false;
  subject: string = '';
  location: string = '';
  time: string = '';
  startTime: string = '';
  finishTime: string = '';
  rememberText: string = '';
  openModal() {
    this.isModalOpen = true;
    console.log("abierto")
  }

  closeModal() {
    this.isModalOpen = false;
    console.log("cerrado")
  }


}
