import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from 'src/app/components/components.module';
import { ZodiacPageRoutingModule } from './zodiac-routing.module';

import { ZodiacPage } from './zodiac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ZodiacPageRoutingModule,
  ],
  declarations: [ZodiacPage]
})
export class ZodiacPageModule {}
