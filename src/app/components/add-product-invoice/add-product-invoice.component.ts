import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';

@Component({
  selector: 'app-add-product-invoice',
  templateUrl: './add-product-invoice.component.html',
  styleUrls: ['./add-product-invoice.component.scss']
})
export class AddProductInvoiceComponent implements OnInit {
  @Input() currentBag: Bag;
  constructor() { }

  ngOnInit(): void {
  }

}
