import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ExpenseResponse, ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expenses!: ExpenseResponse[]
  constructor(private expenseService: ExpenseService) {
    
  }

  ngOnInit() {
    this.getExpenses()
  }

  getExpenses() {
    this.expenseService.getAll().then(res => {
      this.expenses = res.data
    })
  }

  deleteExpense(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.delete(id).then(res => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => this.getExpenses());
        })
      }
    });
  }
}
