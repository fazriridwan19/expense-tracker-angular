import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { ExpenseCreateComponent } from './pages/expense-create/expense-create.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, title: 'Home'},
    {path: 'dashboard', component: DashboardComponent, title: 'Dashboard'},
    {path: 'expense', component: ExpensesComponent, title: 'Expenses'},
    { path: 'expense/create', component: ExpenseCreateComponent, title: 'Create expense'}
];
