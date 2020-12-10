import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-invoice-description-product',
  templateUrl: './invoice-description-product.component.html',
  styleUrls: ['./invoice-description-product.component.scss']
})
export class InvoiceDescriptionProductComponent implements OnInit {
  @Input() currentProduct: {productTitle: string, productAmount: number};
  products: Array<Product> = [];
  currentDetailedProduct: Product
  constructor(private productHelp: ProductosService) { }
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void{
    this.productHelp.getAllProducts().subscribe((productArr) => {
      this.products = productArr.map((product) => ({
        ...product.payload.doc.data(),
        $key: product.payload.doc.id
      }) as Product);
      this.currentDetailedProduct = this.products.find((productProspect) => {
        return productProspect.title == this.currentProduct.productTitle;
      })
    })
  }

}
