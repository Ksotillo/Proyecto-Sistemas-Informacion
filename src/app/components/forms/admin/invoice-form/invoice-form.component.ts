import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup = null;
  products: Array<{
    product: string,
    price: number   
  }>

  constructor(
    private fireHelper: PedidosService,
    private fb: FormBuilder,
    private routing: Router
  ) { }

  ngOnInit(): void {
  }
  createForm():void{
  
  }

  onSubmit(){}
}
