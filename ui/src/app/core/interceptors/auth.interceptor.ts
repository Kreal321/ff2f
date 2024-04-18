import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { DataResponse } from '../models/common/dataResponse.model';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'));

        console.log('intercepted request ... ');

        return next.handle(req.clone(
            {
                headers
            }
        )).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse<DataResponse>) {
                        (event.body as DataResponse).token == null ? null : localStorage.setItem('token', (event.body as DataResponse).token);
                    }
                }
            }),
            catchError((response) => {
                if (response instanceof HttpErrorResponse) {
                    if (response.status == 403) {
                        localStorage.removeItem('token');
                        Swal.fire({
                            title: 'You are not logged in',
                            text: 'Please login first',
                            showDenyButton: true,
                            icon: 'error',
                            confirmButtonText: 'Login',
                            denyButtonText: 'Continue as guest',
                            denyButtonColor: '#9fa6b2',
                        }).then((request) => {
                            if (request.isConfirmed) {
                                this.router.navigate(['/login']);
                            }
                            if (request.isDenied) {
                                this.router.navigate(['/register/temp']);
                            }
                        })
                    } else if (response.status == 400 || response.status == 401 || response.status == 404) {
                        throw response.error;
                    } else {
                        Swal.fire({
                            title: 'Network Error',
                            text: 'Please try again later',
                            icon: 'error',
                        })
                        console.error('An unexpected error occurred: ', response.error.message);
                    }
                }
                return of(response.error as DataResponse);
            })
        ) as Observable<HttpEvent<any>>;

    }

}
