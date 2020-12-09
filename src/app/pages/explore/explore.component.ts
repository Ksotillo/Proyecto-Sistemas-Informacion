import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

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
  category: string = ''

  constructor(private router: ActivatedRoute, private productService: ProductosService, private categoryService: CategoriesService){ }

  ngOnInit(): void {
    var linkData: string
    this.router.paramMap.subscribe((item) =>{
      linkData = item.get('userInput')
      this.category = linkData.slice(0,linkData.indexOf('&'))
      this.userInput = linkData.slice(linkData.indexOf('&')+1).trim()
      this.displayProducts()
    })
  }
  showAllProducts(){
  }
  displayProducts():void{
    this.listToDisplay = []
    this.productService.getAllProducts().subscribe((items) => 
    this.listToDisplay = items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Product)).filter((elem) =>{
      if (this.category == 'Todos') {
        console.log(this.userInput != '')
        if (this.userInput != '') {
          if (elem.title.includes(this.userInput) || elem.description.includes(this.userInput)) {
            console.log('title: ',elem.title,'descp: ', elem.description)
            return elem
          }
        } else {
          return elem
        }
      }else{
        this.categoryService.getAllCategories().subscribe((categoryy) =>{
          categoryy.map((cat) =>({...cat.payload.doc.data(), $key: cat.payload.doc.id }as Categories)).forEach(
            (catValue,index)=> {if (catValue.name == this.category){
              catValue.productsIds.forEach((product)=>{
                console.log('current value: ',catValue.name)
                console.log('id product: ',product, 'id elem', elem.$key)
              if (product == elem.$key) {
                if (elem.title.includes(this.userInput) || elem.description.includes(this.userInput)) {
                  this.listToDisplay.push(elem) 
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
    this.listToDisplay = this.listToDisplay
  }
}
