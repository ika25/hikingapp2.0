import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFindsPage } from './new-finds.page';

const routes: Routes = [
  {
    path: '',
    component: NewFindsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewFindsPageRoutingModule {}
