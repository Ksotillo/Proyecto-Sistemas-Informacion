import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  @Input() cart: Cart;
  @Input() currentBag: Bag;

  constructor() { }

  ngOnInit(): void {
  }

}
