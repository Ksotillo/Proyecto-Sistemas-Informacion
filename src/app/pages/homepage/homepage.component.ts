import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
products: Array<Product>
  constructor( public productsservices: ProductosService, public categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts():void{
  this.productsservices.getAllProducts().subscribe((items) => {
  this.products = items.map((item) =>({...item.payload.doc.data(),
  $key: item.payload.doc.id } as Product)).filter((product) => {
   this.categoryService.getAllCategories().subscribe((categoryy) =>{
    categoryy.map((cat) =>({...cat.payload.doc.data(), $key: cat.payload.doc.id }as Categories)).forEach(
      (catValue,index)=>{
        if (catValue.productsIds.length != 0) {
          if (catValue.productsIds[0] == product.$key) {
            if (!this.products.includes(product)) {
              this.products.push(product)
            }
            
          }
          
        }})})})})}
}