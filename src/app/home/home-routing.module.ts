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
        import('../pages/record/record.module').then(m => m.RecordPageModule)
      },
      {
        path: 'feed',
        loadChildren: () =>
        import('../pages/feed/feed.module').then(m => m.FeedPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
