import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindBookmarksPage } from './find-bookmarks.page';

const routes: Routes = [
  {
    path: '',
    component: FindBookmarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindBookmarksPageRoutingModule {}
