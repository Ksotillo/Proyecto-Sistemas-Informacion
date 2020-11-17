import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import {Categories } from 'src/app/models/categories';
import {CategoriesService} from 'src/app/service/admin-crud/categories.service'; 
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  loading = false;
  editCategory: Categories = null;
  CategoryForm: FormGroup;
  CategoryId = '';
  constructor(
    private fb: FormBuilder,
    private CategoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  name: string
  descripton: string
  categories: Array<Categories>
  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
    this.getAllCategories();
  }

  deleteCategory(){
    this.route.paramMap.subscribe((params) =>{ this.CategoryId = params.get('categoryId');
  if (this.CategoryId) {
    this.CategoriesService.deleteCategory(this.CategoryId);
  }})
  }
  getUrlParams(): void{
    this.route.paramMap.subscribe((params) =>{ this.CategoryId = params.get('categoryId');
  if(this.CategoryId){
    this.loading = true;
    this.CategoriesService.getCategorieByName(this.CategoryId).subscribe((item)=>{
      this.editCategory = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      this.CategoryForm.patchValue({
        name: this.editCategory.name,
        description: this.editCategory.name,
        image: this.editCategory.image
      });
      this.loading = false;
    });
  }
  }
  )}
  getAllCategories(){
    this.CategoriesService.getAllCategories().subscribe((items) => 
    this.categories = items.map((item) =>({...item.payload.doc.data(),
    $key: item.payload.doc.id } as Categories)));
  }
 createForm(): void{
   this.CategoryForm = this.fb.group({
     name: [''],
     description: [''],
     image: ['']
   })
 }
 createCategory(data: Categories): void{
 this.loading = true;
 this.CategoriesService.createNewCategory(data).then((res) =>{
   this.loading = false;
 })
 }
 updateCategory(): void{
  const dataCategory2: Categories = {
    name: this.CategoryForm.get('name').value,
    description: this.CategoryForm.get('description').value,
    image: this.CategoryForm.get('image').value
  };
   this.loading = true;
   this.CategoriesService.updateCategory(dataCategory2,this.CategoryId).then((res)=>
   this.loading = false)
 }
 onSubmit(): void{
   const dataCategory: Categories = {
     name: this.CategoryForm.get('name').value,
     description: this.CategoryForm.get('description').value,
     image: this.CategoryForm.get('image').value
   };
   this.createCategory(dataCategory);
 }
}
