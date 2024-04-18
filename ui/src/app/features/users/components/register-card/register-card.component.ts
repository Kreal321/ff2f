import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {UserService} from "../../../../core/services/user.service";
import {Router} from "@angular/router";
import {DataResponse} from "../../../../core/models/common/dataResponse.model";

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent {

  token: string = '';
  username: string = '';
  userHash: string = '';
  email: string = '';
  preferredName: string = '';
  code: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    // Swal.fire({
    //   title: 'Registration is not open yet',
    //   text: 'Register as a guest to play',
    //   icon: 'info',
    //   confirmButtonText: 'Continue',
    // }).then(() => {
    //   this.router.navigate(['/register/temp']);
    // })
  }

  register(): void {
    this.userService.register(this.username, this.email, this.preferredName).subscribe({
      next: (response: DataResponse) => {
        console.log(response);
        if (response.success) {
          Swal.fire({
            title: 'Registration Successful',
            text: 'Welcome ' + response.data.preferredName,
            icon: 'success',
            confirmButtonText: 'Continue',
          }).then(() => {
            this.router.navigate(['/users/' + response.data.userId]);
          })
        }
      },
      error: (response: DataResponse) => {
        console.log(response);
        Swal.fire({
          title: 'Registration Failed',
          text: response.message,
          icon: 'error',
        })
      }
    });
  }
}
