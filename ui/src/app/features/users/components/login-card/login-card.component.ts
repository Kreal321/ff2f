import { Component } from '@angular/core';
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent {

  token: string = '';
  username: string = '';
  code: string = '';
  showPasswordInput: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  loginWithCredentials(): void {
    this.userService.loginWithCredentials(this.username, this.code).subscribe({
      next: (response: DataResponse) => {
        console.log(response);
        if (response.success) {
          Swal.fire({
            title: 'Login Successful',
            text: 'Welcome back ' + response.data.preferredName,
            icon: 'success',
            confirmButtonText: 'Continue',
          }).then(() => {
            this.router.navigate(['/profile']);
          })
        }
      },
      error: (response: DataResponse) => {
        console.log(response);
        Swal.fire({
          title: 'Login Failed',
          text: response.message,
          icon: 'error',
        }).then(() => {
          this.showPasswordInput = true;
        })
      }
    });
  }
}
