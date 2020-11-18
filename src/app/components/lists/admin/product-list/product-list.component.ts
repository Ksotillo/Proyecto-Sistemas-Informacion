import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  loading: boolean = false;

  constructor(private productService: ProductosService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe((items) => {
      this.products = items.map((item) => ({
        ...item.payload.doc.data(),
        $key: item.payload.doc.id} as Product)
      );
      this.loading = false;
    });
  }

  deleteProduct(productID: string) {
    this.loading = true;
    this.productService.deleteProduct(productID).then((response) => {
      this.loading = false;
    });
  }
}
