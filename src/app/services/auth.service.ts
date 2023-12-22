import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/api/v1/auth';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  async login(loginRequest: object) {
    return axios.post(`${this.url}/login`, loginRequest).then((res) => {
      localStorage.setItem('token', res.data.token);
      this._isLoggedIn$.next(true);
    });
  }

  logout() {
    localStorage.clear();
  }
}
