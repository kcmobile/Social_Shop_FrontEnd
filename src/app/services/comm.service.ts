import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  constructor(private http: HttpClient) { }

  set(data) {
    localStorage.setItem("userData", JSON.stringify(data));
  }

  get() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  logout() {
    localStorage.clear();
  }
}
