import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeComponent } from "./core/components/page-home/page-home.component";

const routes: Routes = [
  {
    path: '', component: PageHomeComponent
  },
  {
    path: 'games', loadChildren: () => import('./features/games/games.module')
      .then(m => m.GamesModule)
  },
  {
    path: 'users', loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule)
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
