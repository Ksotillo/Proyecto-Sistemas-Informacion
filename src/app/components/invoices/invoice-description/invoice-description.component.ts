import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-invoice-description',
  templateUrl: './invoice-description.component.html',
  styleUrls: ['./invoice-description.component.scss']
})
export class InvoiceDescriptionComponent implements OnInit {
  @Input() pedido: Invoice;
  @Output() pedidoOUT = new EventEmitter<Invoice>();
  constructor() { }

  ngOnInit(): void {
  }

  retornarPedido(): void{
    this.pedidoOUT.emit(this.pedido);
  }
}
