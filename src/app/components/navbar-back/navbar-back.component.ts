import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-back',
  templateUrl: './navbar-back.component.html',
  styleUrls: ['./navbar-back.component.scss']
})
export class NavbarBackComponent implements OnInit {

  constructor(private locationHelper: Location) { }

  ngOnInit(): void {
  }

  goBack(): void{
    this.locationHelper.back();
  }
}
