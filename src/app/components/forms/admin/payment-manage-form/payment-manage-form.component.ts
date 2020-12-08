import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-manage-form',
  templateUrl: './payment-manage-form.component.html',
  styleUrls: ['./payment-manage-form.component.scss']
})
export class PaymentManageFormComponent implements OnInit {
  paymentForm: FormGroup;
  paypalEnabled: boolean = false;
  storepayEnabled:  boolean = false;
  transfEnabled:  boolean = false;
  pickupEnabled:  boolean = false;
  deliveryEnabled:  boolean = false;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.paymentForm = this.fb.group({
      paymentCheck1: '',
      paymentCheck2: '',
      paymentCheck3: '',
      deliveryType1: '',
      deliveryType2: '',
    })
  }
}
