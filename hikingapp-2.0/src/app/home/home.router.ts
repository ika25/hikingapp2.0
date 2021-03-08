import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
          }
        ]
      },
      {
        path: 'places',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/places/places.module').then(m => m.PlacesPageModule)
          }
        ]
      },
      {
        path: 'record',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/record/record.module').then(m => m.RecordPageModule)
          }
        ]
      },
      {
        path: 'calories',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/calories/calories.module').then(m => m.CaloriesPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/calories',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRouter { }