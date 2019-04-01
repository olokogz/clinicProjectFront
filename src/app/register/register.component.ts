import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

usernameFormControl = new FormControl('',[
  Validators.required
]);
passwordFormControl = new FormControl('',[
  Validators.required,
  Validators.minLength(6)
]);
enabledFormControl = new FormControl('',[
  Validators.required,
]);
matcher = new MyErrorStateMatcher();

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.username,
      this.form.password,
      this.form.enabled);
  
      this.authService.signUp(this.signupInfo).subscribe(
        data=>{
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
        },
        error=>{
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );

    }

}
