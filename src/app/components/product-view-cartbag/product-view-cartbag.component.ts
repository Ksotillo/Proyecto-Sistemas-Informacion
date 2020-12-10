import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bag } from 'src/app/models/bag';

@Component({
  selector: 'app-product-view-cartbag',
  templateUrl: './product-view-cartbag.component.html',
  styleUrls: ['./product-view-cartbag.component.scss']
})
export class ProductViewCartbagComponent implements OnInit {
  @Input() bagShow: Bag
  @Input() actualBag: Bag
  @Input() allBags:  Array<Bag>
  bagIndex: number;
  @Output() bagOUT = new EventEmitter<Bag>();
  @Output() bagOUTELIMINATION = new EventEmitter<Bag>()
  constructor() { }

  ngOnInit(): void {
    this.bagIndex = this.allBags.indexOf(this.bagShow) + 1
  }

  emitBag(): void{
    this.bagOUT.emit(this.bagShow)
  }
  killBag(){
    this.bagOUTELIMINATION.emit(this.bagShow)
  }
}
