import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  
  constructor(
    private authenticator: AuthenticationService,
    private router: Router
  ) { 

  }
    user = {
      name: '',
      email: '',
      photoUrl: ''
    }
    $isAdmin: boolean = false;
  ngOnInit(): void {
    this.authenticator.getCurrentUser().subscribe((items) =>{
      console.log('I started the auth')
      if (items){
        this.user.name = items.displayName;
        this.user.email = items.email;
        this.user.photoUrl = items.photoURL;
      }
      if (this.authenticator.isAdmin()){
        this.$isAdmin = true;
      }
    })
  }

  userLogout(): void{
      console.log('Going out')
      this.authenticator.loginOut().then(() => {
        this.router.navigate(['']);
      }).catch((ERR) =>{
        console.log(ERR)
      })
  }
  navigateToAdmin():void{
      this.router.navigate(['admin/products']);
  }
}
