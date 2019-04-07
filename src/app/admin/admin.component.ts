import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {User} from "../model/user"
import {AdminServiceService} from "../service/admin-service.service"
import {Router} from "@angular/router";
import { TokenStorageService } from '../auth/token-storage.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  users:User[];

  constructor(private router: Router,private userService: UserService, private adminService: AdminServiceService, private tokenStorageService: TokenStorageService) { }
 
  ngOnInit() {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    if(!this.tokenStorageService.getToken()){
      
          this.router.navigate(['login']);
        }
        this.adminService.getUsers().subscribe(data=>{ this.users = data.result});
        console.log(this.users);
    }
    
  }
