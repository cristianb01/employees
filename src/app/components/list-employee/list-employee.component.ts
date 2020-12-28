import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeModel } from '../../models/employee.model';
import { Routes } from '../../shared/routes';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {

  employees: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>();

  routes = Routes;

  constructor(private employeeService: EmployeeService) {
    this.getEmployees();
  }

  ngOnInit(): void {
  }
  
  private getEmployees(): void {
    this.employees = this.employeeService.getAllEmployees({sortByProperty: 'name', ascendant: true});
  }

  public deleteEmployee(employeeId?: string): void {
    if (!employeeId) return;
    this.employeeService.deleteEmployee(employeeId).then(() => {
      console.log('Employee successfully deleted');
    }).catch(() => console.log('An error ocurred while deleting employee'));
  }

}
