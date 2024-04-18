import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageGamesCreateComponent } from './pages/page-games-create/page-games-create.component';
import {PageGameDetailComponent} from "./pages/page-game-detail/page-game-detail.component";

const routes: Routes = [
  {
    path: 'create', component: PageGamesCreateComponent
  },
  {
    path: ':id', component: PageGameDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
