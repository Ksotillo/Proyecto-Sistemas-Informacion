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
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getURL();
  }

  /*
  Crea el formulario para crear/editar un producto
  */

  createForm(): void {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      weight: [''],
      stock: ['']
    });
  }

  /*
  Crea un producto
  */

  createProduct(info: Product): void {
    this.loading = true;
    this.productService.createProduct(info).then((res) => {
      this.loading = false;
      this.router.navigate(['admin/products']);
    });
  }

  /*
  Actualiza un producto
  */

  updateProduct(info: Product): void {
    this.loading = true;
    this.productService.updateProduct(info, this.productID).then(() => {
      this.loading = false;
      this.router.navigate(['admin/products']);
    });
  }

  onUpload(event) {
    const imageID = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `uploads/product_${imageID}`
    const ref = this.storage.ref(filePath);
    const productImage = this.storage.upload(filePath,file);
    productImage.snapshotChanges().pipe(finalize(() => this.imageURL = ref.getDownloadURL())).subscribe();
  }

  /*
  Acción que se ejecuta cuando se presiona el botón
  */

  onSubmit(): void {
    if(this.imageURL) {
      this.imageURL.subscribe((response) => {

        const dataProduct: Product = {
          title: this.productForm.get('title').value,
          description: this.productForm.get('description').value,
          price: this.productForm.get('price').value,
          weight: this.productForm.get('weight').value,
          stock: this.productForm.get('stock').value,
          image: response
        }

        if (this.editProduct) {
          this.updateProduct(dataProduct);
          return;
        }
  
        this.createProduct(dataProduct);
      });
    }
    else if(this.editProduct) {
      this.editProduct = {
        title: this.productForm.get('title').value,
        description: this.productForm.get('description').value,
        price: this.productForm.get('price').value,
        weight: this.productForm.get('weight').value,
        stock: this.productForm.get('stock').value,
        image: this.editProduct.image
      }
      this.updateProduct(this.editProduct)
    }
  }

  /*
  Obtiene un producto a partir de una ruta relativa
  */

  getURL(): void {
    this.route.paramMap.subscribe((params) => {
      this.productID = params.get('product');

      if (this.productID) {
        this.loading = true;
        this.productService.getProductByID(this.productID).subscribe((item) => {

          this.editProduct = {
            $key: item.payload.id,
            ...item.payload.data(),
          };

          this.productForm.patchValue({
            title: this.editProduct.title,
            description: this.editProduct.description,
            price: this.editProduct.price,
            weight: this.editProduct.weight,
            stock: this.editProduct.stock,
          });
          this.loading = false;
        });
      }
    });
  }
}