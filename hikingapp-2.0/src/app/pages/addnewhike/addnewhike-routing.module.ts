import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnewhikePage } from './addnewhike.page';

const routes: Routes = [
  {
    path: '',
    component: AddnewhikePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnewhikePageRoutingModule {}
