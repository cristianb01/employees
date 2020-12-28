import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeePageComponent } from './pages/list-employee-page/list-employee-page.component';
import { EmployeeManagementPageComponent } from './pages/employee-management-page/employee-management-page.component';

const routes: Routes = [
  { path: 'employee-list', component: ListEmployeePageComponent },
  { path: 'employee-management', component: EmployeeManagementPageComponent },
  { path: 'edit-employee/:id', component: EmployeeManagementPageComponent },
  { path: '**', redirectTo: 'employee-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
