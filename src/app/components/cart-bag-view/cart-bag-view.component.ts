import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-cart-bag-view',
  templateUrl: './cart-bag-view.component.html',
  styleUrls: ['./cart-bag-view.component.scss']
})
export class CartBagViewComponent implements OnInit {
  @Input() cartBags: Array<Bag>; 
  
  constructor() { }

  ngOnInit(): void {
  }
}
