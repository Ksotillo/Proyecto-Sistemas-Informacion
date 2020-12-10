import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'wish-list-product',
  templateUrl: './wish-list-product.component.html',
  styleUrls: ['./wish-list-product.component.scss']
})
export class WishListProductComponent implements OnInit {
@Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

}
