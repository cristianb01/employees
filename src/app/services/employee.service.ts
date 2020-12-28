import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestoreService: AngularFirestore) {
  }

  public getAllEmployees(sortOptions: SortOptions): Observable<EmployeeModel[]> {

    return this.firestoreService.collection('employees', ref => ref.orderBy(sortOptions.sortByProperty, sortOptions.ascendant ? 'asc' : 'desc')).snapshotChanges().pipe(
      map((data: any[]) => {
        return data.map((element) => {
          const parsedModel: EmployeeModel = {
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          };
          return parsedModel;
        })
      })
    );
  }

  public getEmployee(employeeId: string): Observable<any> {
    return this.firestoreService.collection('employees').doc(employeeId).snapshotChanges();
  }
  
  public createEmployee(employee: EmployeeModel): Promise<any> {
    return this.firestoreService.collection('employees').add(employee);
  }

  public deleteEmployee(employeeId?: string): Promise<void> {
    return this.firestoreService.collection('employees').doc(employeeId).delete();
  }

  public updateEmployee(employeeId: string, employeeModel: EmployeeModel): Promise<void> {
    return this.firestoreService.collection('employees').doc(employeeId).update(employeeModel);
  }

}

interface SortOptions {
  sortByProperty: 'name' | 'lastName' | 'salary' | 'identification',
  ascendant?: true
}