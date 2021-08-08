import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: PlacesPage,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./discover/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule)
          }
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadChildren: () => import('./finds/finds.module').then(m => m.FindsPageModule)
          },
          {
            path: 'new',
            loadChildren: () => import('./finds/new-finds/new-finds.module').then(m => m.NewFindsPageModule)
          },
          {
            path: 'edit/:placeId',
            loadChildren: () => import('./finds/edit-finds/edit-finds.module').then(m => m.EditFindsPageModule)
          },
          {
            path: ':placeId',
            loadChildren: () => import('./finds/find-bookmarks/find-bookmarks.module').then(m => m.FindBookmarksPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/places/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule {}
