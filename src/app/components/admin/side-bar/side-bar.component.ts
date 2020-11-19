import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  currentRoute: string
  constructor(private route: Router) { }
  petitionParser: string = '';
  productParser: string = '';
  catalogParser: string = '';
  ngOnInit(): void {
    this.currentRoute = this.route.url.slice(7)
    switch (this.currentRoute) {
      case 'products':
        this.productParser = 'active'; 
        break;
      case 'petitions':
        this.petitionParser = 'active';
        break;
      case 'categories':
          this.catalogParser = 'active'
          break;
    
      
    }
  }

}
