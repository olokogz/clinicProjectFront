import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService){}


private pmButton: boolean = false;
private adminButton: boolean = false;
private userButton: boolean = false;
private loginButton: boolean = false;
private count = 0;
  ngOnInit() {
    
    if(this.tokenStorage.getToken()){
      this.loginButton = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.forEach(role => {
        if(role==='ROLE_ADMIN'){
          this.authority='admin';
          this.adminButton = true;
          console.log("ADMIN BUTTON SET")
        }
        if(role === 'ROLE_PM')
        {
          this.authority = 'pm';
          this.pmButton = true;
          console.log("PM BUTTON SET")
        }
        if(role==="ROLE_USER")
        {
          this.authority='user';
          this.userButton = true;
          console.log("USER BUTTON SET")
        }
        this.count++
        if(this.roles.length > this.count)
        {
          return true
        }
        else{
          return false;
        }
      });
    }
  }
  title = 'clinicProjectFront';
}
 