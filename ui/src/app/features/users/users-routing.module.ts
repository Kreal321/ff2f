import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageUserProfileComponent } from "./pages/page-user-profile/page-user-profile.component";
import { PageUserLoginComponent } from "./pages/page-user-login/page-user-login.component";
import { PageUserRegisterComponent } from "./pages/page-user-register/page-user-register.component";

const routes: Routes = [
  {
    path: 'login', component: PageUserLoginComponent
  },
  {
    path: 'register', component: PageUserRegisterComponent
  },
  {
    path: ':id', component: PageUserProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
