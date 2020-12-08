import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signednav-bar',
  templateUrl: './signednav-bar.component.html',
  styleUrls: ['./signednav-bar.component.scss']
})
export class SignednavBarComponent implements OnInit {
  constructor(private Router: Router,private Auth: AuthenticationService, public product: ProductosService, public category: CategoriesService, public fb: FormBuilder) { }
  products: Array<Product>
  categories: Array<Categories>
  searchBar: FormGroup
  userInput: string
  results: Array<Object>
  empty: string = ''
  currentCat: string = 'Todos'
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
  onSubmit():void{

  }
  toggleFilter():void{
    
  }
}
