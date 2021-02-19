import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaloriesPage } from './calories.page';

const routes: Routes = [
  {
    path: '',
    component: CaloriesPage,
    children: [
      {
        path: 'news',
        loadChildren: () => import('../../pages/messages/messages.module').then( m => m.MessagesPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../../pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaloriesPageRoutingModule {}
