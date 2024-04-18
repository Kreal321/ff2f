import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse } from "../models/common/dataResponse.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly hostUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.hostUrl = environment.api;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  loginWithCredentials(username: string, oneTimePassword: string): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/users/login', {username, oneTimePassword});
  }

  register(username: string, email: string, preferredName: string): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.hostUrl + '/users/register', {username, email, preferredName});
  }


}
