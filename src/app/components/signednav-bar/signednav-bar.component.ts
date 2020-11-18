import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signednav-bar',
  templateUrl: './signednav-bar.component.html',
  styleUrls: ['./signednav-bar.component.scss']
})
export class SignednavBarComponent implements OnInit {
  constructor(private Auth: AuthenticationService) { }
  userId: string
  ngOnInit(): void {
    if(this.isAuth()){
      this.Auth.getCurrentUser().subscribe((user) => {
        this.userId = user.uid;
      })
    }
  }
  isAuth(): boolean{
    return this.Auth.isAuthenticated();
  }
}
