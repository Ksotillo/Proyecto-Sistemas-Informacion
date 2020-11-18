import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';
import { Invoice } from 'src/app/models/invoice';
import { Bag } from 'src/app/models/bag';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup = null;
  @Input() invoice: Invoice;
  validationResults: string = '';
  errorMsg1: string = '';
  hasError: boolean = false;
  totalPrice: number;
  productBags: Array<Bag> = [];
  bagNum: number;
  constructor(
    private pedidosHelper: PedidosService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm():void{
    this.invoiceForm = this.fb.group({
      clientName: '',
      saleStatus: '',
      deliveryMethod: '',
      expeditionDate: '',
    })

    if(this.invoice){
      this.invoiceForm.patchValue({
        clientName : this.invoice.name,
        saleStatus : this.invoice.currentState,
        deliveryMethod : this.invoice.deliveryTipe,
        expeditionDate : this.invoice.creationDate
      })
      this.totalPrice = this.invoice.totalPrice;
      this.bagNum = 1;
      if(this.invoice.products.length == 0){
        this.productBags = [{
          bagContents : [],
          bagWeight: 0}];
      }
    }
  }

  onSubmit(){

  }

  validateName(): void{
    const name: string = this.invoiceForm.get('clientName').value
    if(name.trim().length <= 2){
      this.validationResults = 'is-invalid';
      this.errorMsg1 = 'Introduzca un nombre con una longitud de 3 caracteres o más'
    }
    else{
      this.validationResults = 'is-valid';
      this.errorMsg1 = '';
    }
  }

  goBefore() : void {
    this.bagNum = this.bagNum - 1
  }
  goNext() : void {
    this.bagNum = this.bagNum + 1;
  }
  addBag(): void {
    this.productBags.push({
      bagContents : [],
      bagWeight: 0})
      this.bagNum = this.productBags.length;
  }
  resetError() : void{
    window.setTimeout(() => {this.hasError = false},200);
  }
}
