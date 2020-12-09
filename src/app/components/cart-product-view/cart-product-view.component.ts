import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-cart-product-view',
  templateUrl: './cart-product-view.component.html',
  styleUrls: ['./cart-product-view.component.scss']
})
export class CartProductViewComponent implements OnInit {
  @Input() bagToShow: Bag;

  constructor() { }

  ngOnInit(): void {
  }

  
}
