import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private Router: Router,private Auth: AuthenticationService, public category: CategoriesService, public fb: FormBuilder) {}

  products: Array<Product> = []
  categories: Array<Categories>
  searchBar: FormGroup
  userId: string;
  userInput: string
  results: Array<Object>
  empty: string = ''
  currentCat: string = 'Todos'
  ngOnInit(): void {
    this.getAllCategories()
    this.createForm()
    this.Auth.getCurrentUser().subscribe((currentUser) => {
      if(currentUser){
        this.userId = currentUser.uid;
      }
    })
  }
  createForm():void{
    this.searchBar = this.fb.group({
      searchBoxContent: '',
    })
  }
  standardResults():void{
  }
  selectCat(cat: Categories):void{
    this.currentCat = cat.name
    document.getElementById('dropdown-items').classList.remove('show')
  }
  toggleFilter():void{
    if (!document.getElementById('dropdown-items').classList.contains('show')) {
      document.getElementById('dropdown-items').classList.add('show')
    } else {
      document.getElementById('dropdown-items').classList.remove('show')
      
    }
  }

  default(){
    this.currentCat = 'Todos';
    document.getElementById('dropdown-items').classList.remove('show')
  }
  getAllCategories():void{
    this.category.getAllCategories().subscribe((items) => 
    this.categories = items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Categories)));
  }
  onSubmit(): void{
    this.userInput = this.searchBar.get('searchBoxContent').value
    console.log(this.userInput)
    this.results = this.products.filter((value) => {
      if (value.title.includes(this.userInput)) {
        return value
      }
      
    })
    this.Router.navigate(['explore/' +this.currentCat+ '&' + this.userInput])
  }
  isAuth(): boolean{
    return this.Auth.isAuthenticated();
  }

}
