import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  editProduct: Product = null;
  productForm: FormGroup;
  productID: string = '';
  imageURL: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [0],
      weight: [0],
      stock: [0],
      image: ['']
    });
  }

  onSubmit(event): void {
    const imageID = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/product_${imageID}`
    const ref = this.storage.ref(filePath);
    const productImage = this.storage.upload(filePath,file);
    productImage.snapshotChanges().pipe(finalize(() => this.imageURL = ref.getDownloadURL())).subscribe();

    if (this.productForm.get('image').value !== '') {
      const dataProduct: Product = {
        title: this.productForm.get('title').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        weight: this.productForm.get('weight').value,
        stock: this.productForm.get('price').value,
        image: this.productForm.get('image').value
      }

      if (this.editProduct) {
        //this.updateProduct(dataProduct);
        return;
      }

      //this.createProduct(dataProduct);
    }
  }
}