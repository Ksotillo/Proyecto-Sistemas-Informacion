import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signingUpForm: FormGroup = null;

  constructor(
    private authenticator: AuthenticationService,
    private fb: FormBuilder,
    private routing: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signingUpForm = this.fb.group({
      name: '',
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
      email: this.signingUpForm.get('email').value,
      password: this.signingUpForm.get('password').value,
      displayName: this.signingUpForm.get('name').value
    }
    this.authenticator.emailSignup(userData).then(() =>{
    this.routing.navigate(['']);
  
    }).catch((ERR) =>{
      console.log(ERR);
    })
  }
}
