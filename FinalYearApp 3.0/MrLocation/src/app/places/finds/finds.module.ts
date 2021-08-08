import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindsPageRoutingModule } from './finds-routing.module';

import { FindsPage } from './finds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindsPageRoutingModule
  ],
  declarations: [FindsPage]
})
export class FindsPageModule {}
