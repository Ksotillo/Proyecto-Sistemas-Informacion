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

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  getUrlParams(): void{
    this.route.paramMap.subscribe((params) =>{ this.CategoryId = params.get('CategoryId');
  if(this.CategoryId){
    this.loading = true;
    this.CategoriesService.getCategorieByName(this.CategoryId).subscribe((item)=>{
      this.editCategory = {
        $key: item.payload.id,
        ...item.payload.data(),
      };
      this.CategoryForm.patchValue({
        name: this.editCategory.name,
      });
      this.loading = false;
    });
  }
  }
  )}
 createForm(): void{
   this.CategoryForm = this.fb.group({
     name: [''],
   })
 }
 createCategory(data: Categories): void{
 this.loading = true;
 this.CategoriesService.createNewCategory(data).then((res) =>{
   this.loading = false;
 })
 }
 updateCategory(data: Categories): void{
   this.loading = true;
   this.CategoriesService.updateCategory(data,this.CategoryId).then((res)=>
   this.loading = false)
 }
 onSubmit(): void{
   const dataCategory: Categories = {
     name: this.CategoryForm.get('name').value,
   };
   if(this.editCategory){
     this.updateCategory(dataCategory);
     return;
   }
   this.createCategory(dataCategory);
 }
}
