import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view-cartprod',
  templateUrl: './product-view-cartprod.component.html',
  styleUrls: ['./product-view-cartprod.component.scss']
})
export class ProductViewCartprodComponent implements OnInit {
  @Input() productShow: {productTitle: string, productAmount: number}
  constructor() { }

  ngOnInit(): void {
  }

}
