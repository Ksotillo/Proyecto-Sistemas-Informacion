import { Component, OnInit, ViewChild } from '@angular/core';
import { from, of } from 'rxjs';
import {Categories } from 'src/app/models/categories';
import {CategoriesService} from 'src/app/service/admin-crud/categories.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  categories: Array<Categories>
  loading = false;
  editCategory: Categories = null;
  currentCategory: Categories = null;
  name: string
  descripton: string
  constructor(
    private CategoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  managecurrentCategory(category: Categories){
    this.currentCategory = category;
  } 
  getAllCategories(){
    this.CategoriesService.getAllCategories().subscribe((items) => 
    this.categories = items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Categories)));
  }
 }

