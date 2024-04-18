import {ErrorHandler, Injectable, NgZone} from "@angular/core";
import {BadRequestError} from "../models/error/badRequestError.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {BadInputError} from "../models/error/badInputError.model";
import {ServerError} from "../models/error/serverError.model";

@Injectable()
export class ErrorInterceptor implements ErrorHandler {

  constructor(
    private router: Router,
    private zone: NgZone
  ) { }

  handleError(error: Error): void {

    if (error instanceof BadRequestError) {
      Swal.fire({
        title: 'Bad Request',
        text: error.message,
        icon: 'error',
      }).then(() => {
        if (error.redirectUrl) {
          this.zone.run(() => this.router.navigate([error.redirectUrl]));
        } else {
          // this.zone.run(() => this.router.navigate(["/"]));
        }
      })
    } else if (error instanceof BadInputError) {
      Swal.fire({
        title: error.name,
        text: error.message,
        icon: 'error',
      })
    } else if (error instanceof ServerError) {
      Swal.fire({
        title: error.name,
        text: error.message,
        icon: 'error',
      })
    } else {
      Swal.fire({
        title: error.name,
        text: error.message,
        icon: 'error',
      })
      console.log(error);
    }


  }
}
