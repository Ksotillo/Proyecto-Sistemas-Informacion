import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bag } from 'src/app/models/bag';

@Component({
  selector: 'app-invoice-description-bag',
  templateUrl: './invoice-description-bag.component.html',
  styleUrls: ['./invoice-description-bag.component.scss']
})
export class InvoiceDescriptionBagComponent implements OnInit {
  @Input()actualBag: Bag;
  @Input()bagToShow: Bag;
  @Input()allBags: Array<Bag> ;
  bagNum: number;
  @Output() bagOUT = new EventEmitter<Bag>();
  constructor() { }

  ngOnInit(): void {
    this.bagNum = this.allBags.indexOf(this.bagToShow) + 1;
  }

  emitBag(): void {
    console.log("SENDING IT")
    this.bagOUT.emit(this.bagToShow);
  }

}
