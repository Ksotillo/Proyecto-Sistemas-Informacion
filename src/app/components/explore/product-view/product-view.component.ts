import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;
  productID: string = '';
  categories: Array<Categories>;
  loading: boolean;

  constructor(
    private productService: ProductosService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getURL();
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
          this.product = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
        });

        this.categoriesService.getAllCategories().subscribe((items) => {
          this.categories = items.map((item) => ({
            ...item.payload.doc.data(),
          $key: item.payload.doc.id}) as Categories).filter((category) => 
          {
            return category.productsIds.find((id) => {return id == this.productID})
          });
        });
        this.loading = false;
      }
    });
  }
}
