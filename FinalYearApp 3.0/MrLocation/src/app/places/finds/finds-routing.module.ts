import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindsPage } from './finds.page';

const routes: Routes = [
  {
    path: '',
    component: FindsPage
  },
  {
    path: 'new-finds',
    loadChildren: () => import('./new-finds/new-finds.module').then( m => m.NewFindsPageModule)
  },
  {
    path: 'edit-finds',
    loadChildren: () => import('./edit-finds/edit-finds.module').then( m => m.EditFindsPageModule)
  },
  {
    path: 'find-bookmarks',
    loadChildren: () => import('./find-bookmarks/find-bookmarks.module').then( m => m.FindBookmarksPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindsPageRoutingModule {}
