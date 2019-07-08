import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from "../model/user"
import { AdminServiceService } from "../service/admin-service.service"
import { Router } from "@angular/router";
import { TokenStorageService } from '../auth/token-storage.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /**
   * Message from backend
   */
  board: string;

  /**
   * Error message from backend
   */
  errorMessage: string;

  /**
   * Array of user
   */
  users: User[];

  /**
   * Defined columns name in table with users
   */
  displayedColumns = ['id','name','username','surname', 'accountCreationDate', 'birthdate', 'emailAddress','enabled','gender','phoneNumber'];

  /**
   * Popup reference in page
   */
  modalRef: BsModalRef;

  /**
   * Message
   */
  message: string;
  
  /**
   * Pagination start page
   */
  page =1;
  
  /**
   * Pagination start size
   */
  pageSize=5;
   
  /**
   * Paginated collection size
   */
  collectionSize: number;
  
  constructor(
    private router: Router, 
    private userService: UserService, 
    private adminService: AdminServiceService, 
    private tokenStorageService: TokenStorageService, 
    private modalService: BsModalService,
    private http: HttpClient) { }


  ngOnInit() {
    /**
     * Getting message from backend response
     */
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

    /**
     * Checking if there is existing session by getting token, if not returning to login page
     */
    if (!this.tokenStorageService.getToken()) {

      this.router.navigate(['login']);
    }

    /**
     * Getting data from database and passing to array User
     */
    this.adminService.getUsers().subscribe(data => {this.users = data});
    //this.collectionSize = this.users.length;
    this.adminService.getUsers().subscribe(data => {this.collectionSize = data.length});

    
  }
  /**
   * Deleting user from database and refreshing table with users
   * @param user 
   */
  deleteUser(user: User): void{
    this.modalRef.hide();
    this.users.splice(this.users.indexOf(user),1);
    this.adminService.deleteUser(user).subscribe(data => {this.users = this.users.filter(u => u !== user)}) 
  }

  /**
   * Function to open warning popup with popup template as param
   * @param template 
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  /**
   * Action when agree button pressed on popup
   */
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  /**
   * Action when decline popup action
   */
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  /**
   * Prepare colection to pagination, slice etc.
   */
  get usersToPagination(): User[]{
    if(this.users!=undefined)
    {
    return this.users
    .map((users,i) => ({id: i + 1, ...users}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
    }
  }


  


}
