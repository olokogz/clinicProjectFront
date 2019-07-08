import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';

import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule,MatFormFieldModule,MatSelectModule, MatNativeDateModule, MatTableModule  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarEditComponent } from './car-edit/car-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/material-module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import {DialogOverviewExampleDialog} from './login/login.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpInterceptorProviders } from './auth/auth-interceptor';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    PmComponent,
    AdminComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    ModalModule.forRoot(),
    CommonModule,
    DataTablesModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    NgbAlertModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}


