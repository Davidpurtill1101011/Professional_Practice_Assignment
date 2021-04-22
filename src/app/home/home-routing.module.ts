import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [

      {
        path: '',
        loadChildren: () =>
        import('../pages/feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'record',
        loadChildren: ()=>
        import('../pages/record/record.module').then(m => m.RecordPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
        import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
