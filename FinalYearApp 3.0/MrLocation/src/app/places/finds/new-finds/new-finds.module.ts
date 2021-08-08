import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewFindsPageRoutingModule } from './new-finds-routing.module';

import { NewFindsPage } from './new-finds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewFindsPageRoutingModule
  ],
  declarations: [NewFindsPage]
})
export class NewFindsPageModule {}
