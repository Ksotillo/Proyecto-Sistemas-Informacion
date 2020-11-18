import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrls: ['./admin-pedidos.component.scss']
})

export class AdminPedidosComponent implements OnInit {
  currentPedido: Invoice;
  listaPedidos: Array<Invoice>;
  isEditing: boolean = false;
  hasError: boolean = false;
  readonlyPrompt:string = "readonly";
  constructor(private invoiceHelper: PedidosService) { }

  ngOnInit(): void {
    this.getPedidos();
    
  }


  getPedidos(): void{
    this.invoiceHelper.getAllInvoices().subscribe((response) => {
      this.listaPedidos = response.map((invoice) => ({
        ...invoice.payload.doc.data(),
        $key: invoice.payload.doc.id
      } as Invoice)
      );
    })
  }

  createNewInvoice(): void {
    if(!this.isEditing){
    this.isEditing = true;
    this.currentPedido = {
      name : '',
      currentState: '',
      deliveryTipe:'',
      creationDate: '',
      totalPrice:0,
      products:[]
    }
    }
    else{
      this.hasError = true
    }
  }

  editInvoice(): void {
    this.isEditing = true;
  }

  resetError() : void{
    window.setTimeout(() => {this.hasError = false},200);
  }

  manageInvoiceBack(invoiceIN : Invoice): void{
    if(invoiceIN.$key){
      this.invoiceHelper.updateInvoice(invoiceIN,invoiceIN.$key).then(() => {
        this.isEditing = false;
        this.getPedidos();
      })
    }
    else{
      this.invoiceHelper.createInvoice(invoiceIN).then(() => {
        this.isEditing = false;
        this.getPedidos();
      })
    }
   
  }

  pedidoSelectManager(pedidoIN: Invoice): void{
    this.currentPedido = pedidoIN;
    this.isEditing = true;
  }
}
