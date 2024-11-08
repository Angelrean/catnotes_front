import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';



@NgModule({

  declarations: [FooterComponent],
  exports: [FooterComponent],

  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class ComponentsModule { }
