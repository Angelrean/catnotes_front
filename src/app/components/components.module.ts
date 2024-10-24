import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms/forms.component';
import { FooterComponent } from './footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormsComponent, FooterComponent],
  exports: [FormsComponent, FooterComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
