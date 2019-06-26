import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from "../model/user"
import { AdminServiceService } from "../service/admin-service.service"
import { Router } from "@angular/router";
import { TokenStorageService } from '../auth/token-storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  users: User[];
  displayedColumns = ['id','name','username','surname', 'accountCreationDate', 'birthdate', 'emailAddress','enabled','gender','phoneNumber'];
  modalRef: BsModalRef;
  message: string;
  constructor(private router: Router, private userService: UserService, private adminService: AdminServiceService, private tokenStorageService: TokenStorageService, private modalService: BsModalService) { }

  ngOnInit() {
    
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    if (!this.tokenStorageService.getToken()) {

      this.router.navigate(['login']);
    }

    
    this.adminService.getUsers().subscribe(data => {this.users = data});
    this.adminService.getUsers().subscribe(data => {console.log(data)});
    
  }

  deleteUser(user: User): void{
    this.modalRef.hide();
    this.users.splice(this.users.indexOf(user),1);
     this.adminService.deleteUser(user).subscribe(data => {this.users = this.users.filter(u => u !== user)}) 
  }

  fetchData(){
    this.adminService.getUsers().subscribe(data=>{this.users = data});
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

}
