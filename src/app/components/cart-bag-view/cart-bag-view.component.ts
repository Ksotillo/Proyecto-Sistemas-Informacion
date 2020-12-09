import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-cart-bag-view',
  templateUrl: './cart-bag-view.component.html',
  styleUrls: ['./cart-bag-view.component.scss']
})
export class CartBagViewComponent implements OnInit {
  @Input() cartBag: Bag; 
  @Input() allBags: Array<Bag>;
  currentNumber: number
  productsPrice: number
  @Output() bagOUT = new EventEmitter<Bag>();
  constructor() { }

  ngOnInit(): void {
    this.currentNumber = this.allBags.indexOf(this.cartBag) + 1;
  }

  emitBag(){
    this.bagOUT.emit(this.cartBag);
  }

}
