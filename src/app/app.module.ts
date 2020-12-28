import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Pages
import { ListEmployeePageComponent } from './pages/list-employee-page/list-employee-page.component';
import { EmployeeManagementPageComponent } from './pages/employee-management-page/employee-management-page.component';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component'

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeePageComponent,
    EmployeeManagementPageComponent,

    NavbarComponent,
    ListEmployeeComponent,
    EmployeeManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
