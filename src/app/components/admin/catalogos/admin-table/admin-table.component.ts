import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit {
  nameValidation: string = ''
  errorMsg1: string = "El nombre no es válido"
  toUpdate: boolean
  categoryId: string;
  readonly: boolean = false;
  loading: Boolean = false
  CategoryForm: FormGroup;
  constructor(private fb: FormBuilder,
    private CategoriesService: CategoriesService) { }
  @Input() currentCategory: Categories =null;
  @Input() readVar: string = '';
  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void{
    this.CategoryForm = this.fb.group({
      name: [''],
      description: [''],
    })
  }
  createCategory(data: Categories): void{
  this.CategoriesService.createNewCategory(data).then((res) =>{  
  this.currentCategory = null;
  })
  this.resetForm();
  }
  resetForm(){
    this.CategoryForm.setValue({
      name: '',
      description:'',
    })
  }
  selected(): boolean{
    if (this.currentCategory) {
      return true;
    } else {
      return false;
    }
  }
  allowEditing():void{
    document.getElementById('exampleInputName').removeAttribute("readonly")
    document.getElementById('categoryDescription').removeAttribute("readonly")
  }
  uneditable(){
    document.getElementById('exampleInputName').setAttribute("readonly", "true");
    document.getElementById('categoryDescription').setAttribute("readonly", "true");
  }
  showCurrent(){
    if (this.currentCategory) {
    this.categoryId= this.currentCategory.$key;
    this.CategoryForm.setValue({
      name: this.currentCategory.name,
      description: this.currentCategory.description,
    })
    this.toUpdate = true
  }else{
      this.resetForm();
    }
  }
  updateCategory(): void{
   const dataCategory2: Categories = {
     name: this.CategoryForm.get('name').value,
     description: this.CategoryForm.get('description').value,
    
   };
    this.CategoriesService.updateCategory(dataCategory2,this.categoryId).then((res)=>
    this.categoryId = null,
    this.currentCategory = null)
    this.resetForm();
  }
  onSubmit(): void{
    this.toUpdate = false
    if (this.CategoryForm.get('name').value == '') {
      return;
    }
    const dataCategory: Categories = {
      name: this.CategoryForm.get('name').value,
      description: this.CategoryForm.get('description').value,
    };
    if (this.currentCategory) {
      this.updateCategory();      
      return;
    }
    this.createCategory(dataCategory);
  }
  create(){
    const dataCategory3: Categories = {
      name: this.CategoryForm.get('name').value,
      description: this.CategoryForm.get('description').value,
     
    }
  }
  deselect(){
    this.nameValidation = '';
    this.showCurrent();
  }
  resetValidation(){
    this.nameValidation = '';
  }
  deleteCategory(){
    if (this.currentCategory.$key) {
      //preguntar si está seguro
      this.CategoriesService.deleteCategory(this.currentCategory.$key).then(
        () => this.currentCategory = null)
        this.resetForm();
        this.allowEditing();
    }else{
      this.currentCategory = null;
      this.showCurrent();
      console.log('No hay nada que borrar')
    }

  }
  validateName(): void{
    const name: string = this.CategoryForm.get('name').value
    if (name.trim().length <= 2) {
      this.nameValidation = 'is-invalid';
    }else{
      this.nameValidation = 'is-valid';
    }
  }
}
