import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import {
  ExpenseResponse,
  ExpenseService,
} from '../../services/expense.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-expense-detail',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.css',
})
export class ExpenseDetailComponent {
  expense!: ExpenseResponse;
  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      console.log(loggedIn);
      if (!loggedIn) {
        this.router.navigate(['login']);
      } else {
        const routeParam = this.route.snapshot.paramMap;
        const id = Number(routeParam.get('id'));
        this.getExpenseById(id);
      }
    });
  }
  getExpenseById(id: number) {
    this.expenseService.getById(id).then((res) => {
      this.expense = res.data;
    });
  }
}
