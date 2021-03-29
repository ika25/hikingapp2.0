import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnewhikePageRoutingModule } from './addnewhike-routing.module';

import { AddnewhikePage } from './addnewhike.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddnewhikePageRoutingModule
  ],
  declarations: [AddnewhikePage]
})
export class AddnewhikePageModule {}
