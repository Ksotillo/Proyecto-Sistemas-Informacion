import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = null
  constructor(
    private authenticator: AuthenticationService,
    private fb: FormBuilder,
    private routing: Router
  ) 
  { }

  ngOnInit(): void {
    this.createForm();
  }
    createForm(){
      this.loginForm = this.fb.group({
        email: '',
        password: ''
      });
    }

    googleLogin():void{
      this.authenticator.googleLogin().then(() => {
        if (this.authenticator.isAuthenticated){
          this.routing.navigate(['']);
        }
      }).catch((ERR) =>{
        console.log(ERR)
      })
    }

    onSubmit(){
      const userData = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
      this.authenticator.emailLogin(userData).then(() =>{
      this.routing.navigate(['']);
    
      }).catch((ERR) =>{
        console.log(ERR);
      })
    }
}
