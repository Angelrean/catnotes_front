import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { CardScheduleComponent } from './calendar/card-schedule/card-schedule.component';
import { HeaderComponent } from './header/header.component';
import { CardSubjectComponent } from './calendar/card-subject/card-subject.component';
import { DaySelectorComponent } from './day-selector/day-selector.component';
import { SubjectModalComponent } from './subject-modal/subject-modal.component';
import { CreateSubjectModalComponent } from './modals/create-subject-modal/create-subject-modal.component';
import { EditSubjectModalComponent } from './modals/edit-subject-modal/edit-subject-modal.component';
import { ViewSubjectModalComponent } from './modals/view-subject-modal/view-subject-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardScheduleComponent,
    CardSubjectComponent,
    DaySelectorComponent,
    SubjectModalComponent,

    CreateSubjectModalComponent,
    EditSubjectModalComponent,
    ViewSubjectModalComponent

  ],
  exports: [HeaderComponent, FooterComponent, CardScheduleComponent, CardSubjectComponent, DaySelectorComponent, SubjectModalComponent],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,

  ],

  providers: [DatePipe]  // Agregar DatePipe a los proveedores
})
export class ComponentsModule { }
