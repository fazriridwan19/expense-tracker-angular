import { Injectable } from '@angular/core';
import axios from 'axios';

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
  
  async create(expense: object) {
    return await axios.post(this.url, expense)
  }

  async getAll() {
    return await axios.get(this.url)
  }

  async getById(id: number) {
    return await axios.get(`${this.url}/${id}`)
  }

  async update(id:number, expense: object) {
    return await axios.put(`${this.url}/${id}`, expense)
  }

  async delete(id: number) {
    return await axios.delete(`${this.url}/${id}`)
  }
}
