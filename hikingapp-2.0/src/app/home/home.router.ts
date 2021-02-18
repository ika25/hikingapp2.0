import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import {HomePage} from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children:[
        {
            path:'feed',
            loadChildren:() => import('../pages/feed/feed.module').then(m => m.FeedPageModule)
        },
        {
            path:'places',
            loadChildren:() => import('../pages/places/places.module').then(m => m.PlacesPageModule)
        },
        {
            path:'record',
            loadChildren:() => import('../pages/record/record.module').then(m => m.RecordPageModule)
        },
        {
          path:'calories',
          loadChildren:() => import('../pages/calories/calories.module').then(m => m.CaloriesPageModule)
        },
        {
            path:'settings',
            loadChildren:() => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
        }
    ]
  }
];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HomeRouter {}