import { Component, OnInit, Inject } from '@angular/core';
 
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('',[
    Validators.required
  ]);
  passwordFormControl = new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();
  
  form:any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage='';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  private message: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, public dialog: MatDialog) { }

  ngOnInit() {

    if(this.tokenStorage.getToken())
    {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit()
  {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(data=>{
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveAuthoriries(data.authorities);

      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      this.reloadPage();
    },
    error =>{
      console.log(error);
      this.errorMessage = error.error.message;
      this.isLoginFailed = true;
    });
  }

  reloadPage(){
    window.location.reload();
  }

  openDialog(message: string): void{
    const dialogRef = setTimeout(() => this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {message: this.message}
    }));

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
