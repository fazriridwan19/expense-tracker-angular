import { Component } from '@angular/core';
import { LoaderComponent } from '../../loader/loader.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseResponse, ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-edit',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './expense-edit.component.html',
  styleUrl: './expense-edit.component.css'
})
export class ExpenseEditComponent {
  expenseId!: number
  expense!: ExpenseResponse
  expenseForm!: FormGroup
  constructor(private expenseService: ExpenseService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap
    this.expenseId = Number(routeParam.get('id'))
    this.expenseService.getById(this.expenseId).then((res: any) => {
      this.expense = {...res.data}
      this.expenseForm = new FormGroup({
        title: new FormControl(this.expense.title),
        description: new FormControl(this.expense.description),
        amount: new FormControl(this.expense.amount)
      });
    })
  }
  updateExpense() {
    this.expense = {
      ...this.expense,
      title: this.expenseForm.value.title,
      description: this.expenseForm.value.description,
      amount: this.expenseForm.value.amount,
    }
    this.expenseService.update(this.expense.id, this.expense).then(res => {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      }).then(res => {
        this.router.navigate(['/expense'])
      });
    })
  }
}
