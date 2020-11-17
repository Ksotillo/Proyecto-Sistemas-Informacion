import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SignednavBarComponent } from '../signednav-bar/signednav-bar.component';

@Component({
  selector: 'app-general-nav-bar',
  templateUrl: './general-nav-bar.component.html',
  styleUrls: ['./general-nav-bar.component.scss']
})
export class GeneralNavBarComponent implements OnInit {
  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }
  isAuth(): boolean{
    return this.auth.isAuthenticated();
  }
}
