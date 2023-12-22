import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

export interface ExpenseResponse {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  description: string
  amount: number
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  url = 'http://localhost:8080/api/v1/expenses'
  private _token!: any;

  constructor(private authService: AuthService) {
    if (authService.isLoggedIn$) {
      this._token = localStorage.getItem('token')
    }
  }
  
  async create(expense: object) {
    return await axios.post(this.url, expense, { headers: {"Authorization" : `Bearer ${this._token}`} })
  }

  async getAll() {
    return await axios.get(this.url, { headers: {"Authorization" : `Bearer ${this._token}`} })
  }

  async getById(id: number) {
    return await axios.get(`${this.url}/${id}`, { headers: {"Authorization" : `Bearer ${this._token}`} })
  }

  async update(id:number, expense: object) {
    return await axios.put(`${this.url}/${id}`, expense, { headers: {"Authorization" : `Bearer ${this._token}`} })
  }

  async delete(id: number) {
    return await axios.delete(`${this.url}/${id}`, { headers: {"Authorization" : `Bearer ${this._token}`} })
  }
}
