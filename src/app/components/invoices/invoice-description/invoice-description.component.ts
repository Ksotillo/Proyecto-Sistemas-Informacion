import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-description',
  templateUrl: './invoice-description.component.html',
  styleUrls: ['./invoice-description.component.scss']
})
export class InvoiceDescriptionComponent implements OnInit {
  @Input() invoice: Invoice;
  constructor() { }

  ngOnInit(): void {
  }

}
