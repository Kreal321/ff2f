import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { PageUserLoginComponent } from './pages/page-user-login/page-user-login.component';
import { PageUserRegisterComponent } from './pages/page-user-register/page-user-register.component';
import { PageUserProfileComponent } from './pages/page-user-profile/page-user-profile.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { RegisterCardComponent } from './components/register-card/register-card.component';


@NgModule({
  declarations: [
    PageUserLoginComponent,
    PageUserRegisterComponent,
    PageUserProfileComponent,
    LoginCardComponent,
    RegisterCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
