import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';

@Component({
  selector: 'app-payment-finish',
  templateUrl: './payment-finish.component.html',
  styleUrls: ['./payment-finish.component.scss']
})
export class PaymentFinishComponent implements OnInit {
  currentInvoice: Invoice;
  constructor(private route: ActivatedRoute, private invoiceHelper: PedidosService) { }

  ngOnInit(): void {
    this.getCurrentInvoice();
  }

  getCurrentInvoice() : void{
    this.route.paramMap.subscribe((item) => {
      this.invoiceHelper.getInvoiceById(item.get('invoiceId')).subscribe((invoiceToLoad) => {
        this.currentInvoice = {
          ...invoiceToLoad.payload.data(),
          $key : invoiceToLoad.payload.id
        }
        //console.log(this.currentInvoice);
      })
    })
  }
}
