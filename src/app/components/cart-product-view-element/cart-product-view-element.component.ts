import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-cart-product-view-element',
  templateUrl: './cart-product-view-element.component.html',
  styleUrls: ['./cart-product-view-element.component.scss']
})
export class CartProductViewElementComponent implements OnInit {
  @Input() productToShow: {productTitle: string, productAmount: number};
  products: Array<Product>;
  productToShowDetails: Product
  constructor(private productHelper: ProductosService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void{
    this.productHelper.getAllProducts().subscribe((productArr) =>{
      this.products = productArr.map((product) => ({
        ...product.payload.doc.data(),
        $key: product.payload.doc.id
      }) as Product )
      this.productToShowDetails = this.products.find((productProspect) => {
        return productProspect.title == this.productToShow.productTitle;
      })
      
    })
  }
}
