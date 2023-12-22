import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import Swal from 'sweetalert2';
import { LoaderComponent } from '../../loader/loader.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-expense-create',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LoaderComponent, CommonModule],
  templateUrl: './expense-create.component.html',
  styleUrl: './expense-create.component.css',
})
export class ExpenseCreateComponent {
  applyForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    amount: new FormControl(''),
  });
  isLoading: boolean = false;
  loadingTitle: string = '';

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log(loggedIn);
      if (!loggedIn) {
        this.router.navigate(['login']);
      }
    });
  }

  createExpense() {
    this.isLoading = true;
    this.loadingTitle = 'Saving';
    let expense = {
      title: this.applyForm.value.title,
      description: this.applyForm.value.description,
      amount: this.applyForm.value.amount,
    };
    this.expenseService.create(expense).then((res) => {
      this.isLoading = false;
      Swal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
      }).then((res) => {
        this.applyForm = new FormGroup({
          title: new FormControl(''),
          description: new FormControl(''),
          amount: new FormControl(''),
        });
        this.router.navigate(['/expense']);
      });
    });
  }
}
