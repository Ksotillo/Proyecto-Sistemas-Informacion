import { Component, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import {Categories } from 'src/app/models/categories';
import {CategoriesService} from 'src/app/service/admin-crud/categories.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { AdminTableComponent } from 'src/app/components/admin/catalogos/admin-table/admin-table.component';
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild(AdminTableComponent)
  private adminTable: AdminTableComponent;
  categories: Array<Categories>
  productsList: Array<Product>
  loading = false;
  name: string
  descripton: string
  constructor(
    private CategoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private ProductosService: ProductosService,
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }
  managecurrentCategory(category: Categories){
    this.adminTable.currentCategory = category;
    this.adminTable.showCurrent();
    this.adminTable.resetValidation();
    this.adminTable.uneditable();
  } 

  getAllCategories(){
    this.CategoriesService.getAllCategories().subscribe((items) => 
    this.categories = items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Categories)));
  }
  getAllProducts(){
    this.ProductosService.getAllProducts().subscribe( (items) =>
      this.productsList = items.map((item) =>({...item.payload.doc.data(),
        $key: item.payload.doc.id } as Product))
    );
  
  }
 }

