import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  api_baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(req) {
    return this.http.post<any>(`${this.api_baseUrl}login`, req);
  }
}
