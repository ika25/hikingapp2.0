import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFindsPageRoutingModule } from './edit-finds-routing.module';

import { EditFindsPage } from './edit-finds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFindsPageRoutingModule
  ],
  declarations: [EditFindsPage]
})
export class EditFindsPageModule {}
