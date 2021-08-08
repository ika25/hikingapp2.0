import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFindsPage } from './edit-finds.page';

const routes: Routes = [
  {
    path: '',
    component: EditFindsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFindsPageRoutingModule {}
