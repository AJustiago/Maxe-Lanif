import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://example.com/api/auth'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, user);
  }
}

