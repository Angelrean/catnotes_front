import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { CardScheduleComponent } from './calendar/card-schedule/card-schedule.component';
import { HeaderComponent } from './header/header.component';
import { CardSubjectComponent } from './calendar/card-subject/card-subject.component';
import { DaySelectorComponent } from './day-selector/day-selector.component';



@NgModule({

  declarations: [HeaderComponent, FooterComponent, CardScheduleComponent, CardSubjectComponent, DaySelectorComponent],
  exports: [HeaderComponent, FooterComponent, CardScheduleComponent, CardSubjectComponent, DaySelectorComponent],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ComponentsModule { }
