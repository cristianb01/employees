import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Routes } from '../../shared/routes';
import { EmployeeModel } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {

  newEmployeeForm: FormGroup;

  routes = Routes;

  employeeId: any;

  isEditing = false;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) {
    this.newEmployeeForm = this.initializeForm();
    this.initializeForm();
    this.employeeId =  this.activatedRoute.snapshot.paramMap.get('id');
    this.checkIsEditing();
  }

  ngOnInit(): void {
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      name:           ['', Validators.required],
      lastName:       ['', Validators.required],
      identification: ['', Validators.required],
      salary:         ['', Validators.required],
    })
  }

  public submitForm(): void {
    if (this.newEmployeeForm.invalid) return;

    const employeeModel = this.mapModel();
    
    if (this.isEditing) {
      this.updateEmployee(this.employeeId, employeeModel);
    }
    else {
      this.createEmployee(employeeModel);
    }

  }

  createEmployee(newEmployeeModel: EmployeeModel): void {
    this.employeeService.createEmployee(newEmployeeModel).then(() => {
      console.log('Employee created!');
      this.router.navigateByUrl(this.routes.employeeList);

    }).catch(error => console.log(error));
  }

  updateEmployee(employeeId: string, employeeModel: EmployeeModel): void {
    this.employeeService.updateEmployee(employeeId, employeeModel).then(() => {
      console.log('Employee updated!');
      this.router.navigateByUrl(this.routes.employeeList);
    });
  }

  private mapModel(): EmployeeModel {
    const newEmployeeModel: EmployeeModel = {
      name: this.newEmployeeForm.controls.name.value,
      lastName: this.newEmployeeForm.controls.lastName.value,
      identification: this.newEmployeeForm.controls.identification.value,
      salary: Number(this.newEmployeeForm.controls.salary.value)
    };

    return newEmployeeModel;
  }

  private checkIsEditing(): void {
    if (this.employeeId) {
      this.isEditing = true;
      this.employeeService.getEmployee(this.employeeId).subscribe(response => {
        console.log(response.payload.data());
        this.newEmployeeForm.setValue(response.payload.data());
        console.log(this.newEmployeeForm.value)
      });
    }
  }
}
