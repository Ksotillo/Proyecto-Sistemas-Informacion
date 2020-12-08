import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';
import { Invoice } from 'src/app/models/invoice';
import { Bag } from 'src/app/models/bag';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup = null;
  productForm: FormGroup = null;
  @Input() invoice: Invoice;
  @Input() readVar: string = '';
  validationResults: string = '';
  validationResults2: string = '';
  validationResults3: string = '';
  errorMsg1: string = '';
  hasError: boolean = false;
  totalPrice: number;
  productBags: Array<Bag> = [];
  bagNum: number;
  products: Array<Product> = [];
  @Output() invoiceOUT = new EventEmitter<Invoice>();
  constructor(
    private fb: FormBuilder,
    private productsHelper: ProductosService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProducts();
    if(this.readVar){
      this.invoiceForm.disable();
    }
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
      else{
        this.productBags = this.invoice.products;
      }
    }
    this.productForm = this.fb.group({
      productName:'',
      productAmount: 1,
    })
  }

  getProducts(): void {
    this.productsHelper.getAllProducts().subscribe((response) =>{
      this.products = response.map((currentProd) => ({
        ...currentProd.payload.doc.data(),
        $key : currentProd.payload.doc.id
      }) as Product)
      console.log(this.products);
    });
  }


  addProduct(){
    const prodName: string = this.productForm.get('productName').value
    const prodNum: number = this.productForm.get('productAmount').value
    const expectedProd = this.products.find((prod) => {
      return prod.title.toLowerCase().trim() == prodName.toLowerCase().trim();
    })
    if(expectedProd){
      if(prodNum <= expectedProd.stock){
        this.products = this.products.map((prod) => {
          if(prod.$key != expectedProd.$key){
            return prod;
          }
          expectedProd.stock = expectedProd.stock - prodNum
          console.log(prod.stock)
          return prod
        })
        this.totalPrice = this.totalPrice + (expectedProd.price * prodNum);
        this.productBags[this.bagNum - 1].bagContents.push({productTitle: expectedProd.title, productAmount: prodNum});
        this.productBags[this.bagNum - 1].bagWeight = this.productBags[this.bagNum - 1].bagWeight + (expectedProd.weight * prodNum);
      }
    }
  }
  onSubmit(){
    this.invoice.name = this.invoiceForm.get('clientName').value;
    this.invoice.currentState = this.invoiceForm.get('saleStatus').value;
    this.invoice.deliveryTipe = this.invoiceForm.get('deliveryMethod').value;
    this.invoice.totalPrice = this.totalPrice;
    this.invoice.creationDate = this.invoiceForm.get('expeditionDate').value;
    this.invoice.products = this.productBags;
    for (const product of this.products) {
      this.productsHelper.updateProduct(product,product.$key);
    }
    this.invoiceOUT.emit(this.invoice);
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

  validateProduct(): void{
    const prodName: string = this.productForm.get('productName').value
    const prodNum: number = this.productForm.get('productAmount').value
    const expectedProd = this.products.find((prod) => {
      return prod.title.toLowerCase().trim() == prodName.toLowerCase().trim();
    })
    if(expectedProd){
      this.validationResults2 = 'is-valid';
      if(prodNum <= expectedProd.stock){
        this.validationResults3 = 'is-valid'
      }
      else{
        this.validationResults3 = 'is-invalid'
      }
    }
    else{
      this.validationResults2 = 'is-invalid';
      this.validationResults3 = '';
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
