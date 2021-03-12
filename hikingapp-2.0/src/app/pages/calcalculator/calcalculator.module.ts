import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalcalculatorPageRoutingModule } from './calcalculator-routing.module';

import { CalcalculatorPage } from './calcalculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalcalculatorPageRoutingModule
  ],
  declarations: [CalcalculatorPage]
})
export class CalcalculatorPageModule {}
