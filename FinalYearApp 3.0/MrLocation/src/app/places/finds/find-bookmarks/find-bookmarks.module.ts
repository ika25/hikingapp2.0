import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindBookmarksPageRoutingModule } from './find-bookmarks-routing.module';

import { FindBookmarksPage } from './find-bookmarks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindBookmarksPageRoutingModule
  ],
  declarations: [FindBookmarksPage]
})
export class FindBookmarksPageModule {}
