import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  @ViewChild(NavBarComponent)
  private navBar: NavBarComponent
  productos: Array<Product>
  listToDisplay: Array<Product> = []
  userInput: string = ''
  userInputS: string[]= []
  category: string = ''
  precios: string = ''
  constructor(private router: ActivatedRoute, private productService: ProductosService, private categoryService: CategoriesService, private Auth: AuthenticationService){ }

  ngOnInit(): void {
    var linkData: string
    this.router.paramMap.subscribe((item) =>{
      linkData = item.get('userInput')
      this.category = linkData.slice(0,linkData.indexOf('&'))
      this.userInput = linkData.slice(linkData.indexOf('&')+1).trim()
      console.log(this.userInput)
      this.showAllProducts()
    })
  }
  isAuth(): boolean{
    return this.Auth.isAuthenticated();
  }
  showAllProducts(){
    this.listToDisplay = []
    this.userInputS = this.userInput.split(' ')
      this.displayProducts2()
    
  }
  checkRange(precio: string, producto: Product): boolean{
    if (true) {
      
    } else {
      
    }
    return true
  }

  displayProducts():void{
    this.productService.getAllProducts().subscribe((items) => 
    items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Product)).filter((elem) =>{
      if (this.category == 'Todos') {
        console.log(this.userInput != '')
        if (this.userInput != '') {
          if (elem.title.toLowerCase().includes(this.userInput.toLowerCase()) || elem.description.toLowerCase().includes(this.userInput.toLowerCase())) {
            console.log('title: ',elem.title,'descp: ', elem.description)
            if (!this.listToDisplay.includes(elem)){
              this.listToDisplay.push(elem)
            }            
          }
        } else {
          if (!this.listToDisplay.includes(elem)) {
            this.listToDisplay.push(elem)
          }
        }
      }else{
        this.categoryService.getAllCategories().subscribe((categoryy) =>{
          categoryy.map((cat) =>({...cat.payload.doc.data(), $key: cat.payload.doc.id }as Categories)).forEach(
            (catValue,index)=> {if (catValue.name == this.category){
              catValue.productsIds.forEach((product)=>{
                console.log('current value: ',catValue.name)
                console.log('id product: ',product, 'id elem', elem.$key)
              if (product == elem.$key) {
                if (elem.title.toLowerCase().includes(this.userInput.toLowerCase()) || elem.description.toLowerCase().includes(this.userInput.toLowerCase())) {
                  if (!this.listToDisplay.includes(elem)) {
                    this.listToDisplay.push(elem)
                  } 
                }
          
              }
              }
              );
            }}
          )
        })

      }
      
    }
    ));
  }

  displayProducts2():void{
    this.productService.getAllProducts().subscribe((items) => 
    items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Product)).filter((elem) =>{
      if (this.category == 'Todos') {
        console.log(this.userInput != '')
        if (this.userInput != '') {
          this.userInputS.forEach((items)=>{
          if (elem.title.toLowerCase().includes(items.toLowerCase()) || elem.description.toLowerCase().includes(items.toLowerCase())) {
            console.log('title: ',elem.title,'descp: ', elem.description)
            if (!this.listToDisplay.includes(elem)){
              this.listToDisplay.push(elem)
            }            
          }
        })} else {
          if (!this.listToDisplay.includes(elem)){
            this.listToDisplay.push(elem)
          }
        }
      }else{
        this.categoryService.getAllCategories().subscribe((categoryy) =>{
          categoryy.map((cat) =>({...cat.payload.doc.data(), $key: cat.payload.doc.id }as Categories)).forEach(
            (catValue,index)=> {if (catValue.name == this.category){
              catValue.productsIds.forEach((product)=>{
                console.log('current value: ',catValue.name)
                console.log('id product: ',product, 'id elem', elem.$key)
              if (product == elem.$key) {
                this.userInputS.forEach((items) =>{                
                if (elem.title.toLowerCase().includes(items.toLowerCase()) || elem.description.toLowerCase().includes(items.toLowerCase())){
                  if (!this.listToDisplay.includes(elem)) {
                    this.listToDisplay.push(elem)
                  } 
                }
              })
              }
              }
              );
            }}
          )
        })

      }
      
    }
    ));
  }

  ngAfterViewInit():void{

    }
  manageResults(list: Array<Product>):void{
    this.listToDisplay = list
    console.log('this is what I have:', list)
  }
  manageCurrentCat(str: string){
    console.log(str)
  }
  searchWithSettings(str: string):void{
    this.listToDisplay = []
    var lowerBound = Number(str.split('-')[0])
    var upperBound = Number(str.split('-')[1])
    this.productService.getAllProducts().subscribe((items) => 
    {items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Product)).filter((elem) =>{
      if (this.category == 'Todos') {       
        if (this.userInput != '') {
          this.userInputS.forEach((items)=>{
          if ((elem.title.toLowerCase().includes(items.toLowerCase()) || elem.description.toLowerCase().includes(items.toLowerCase())&&(elem.price < upperBound && lowerBound < elem.price))){
            console.log('title: ',elem.title,'descp: ', elem.description)
            console.log((elem.price < upperBound && lowerBound < elem.price))
            if (!this.listToDisplay.includes(elem)){
              if ((elem.price < upperBound && lowerBound < elem.price)) {
                this.listToDisplay.push(elem)
              }              
            }            
          }
        })} else {
          if (!this.listToDisplay.includes(elem)){
            if (elem.price < upperBound&& elem.price > lowerBound) {
              if ((elem.price < upperBound && lowerBound < elem.price)) {
                this.listToDisplay.push(elem)
              }
            }
            
          }
        }
      }else{
        this.categoryService.getAllCategories().subscribe((categoryy) =>{
          categoryy.map((cat) =>({...cat.payload.doc.data(), $key: cat.payload.doc.id }as Categories)).forEach(
            (catValue,index)=> {if (catValue.name == this.category){
              catValue.productsIds.forEach((product)=>{
                console.log('current value: ',catValue.name)
                console.log('id product: ',product, 'id elem', elem.$key)
              if (product == elem.$key) {
                this.userInputS.forEach((items) =>{                
                if ((elem.title.toLowerCase().includes(items.toLowerCase()) || elem.description.toLowerCase().includes(items.toLowerCase())&& (elem.price<upperBound&& lowerBound<elem.price))){
                  if (!this.listToDisplay.includes(elem)){
                    if ((elem.price < upperBound && lowerBound < elem.price)) {
                      this.listToDisplay.push(elem)
                    }
                    
                  } 
                }
              })
              }
              }
              );
            }}
          )
        })

      }
      
    }
    )});
  }
}
