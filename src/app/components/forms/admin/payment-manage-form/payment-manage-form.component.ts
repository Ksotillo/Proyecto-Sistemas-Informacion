import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Method } from 'src/app/models/method';
import { MethodsService } from 'src/app/services/admin-crud/methods.service';

@Component({
  selector: 'app-payment-manage-form',
  templateUrl: './payment-manage-form.component.html',
  styleUrls: ['./payment-manage-form.component.scss']
})
export class PaymentManageFormComponent implements OnInit {
  paymentForm: FormGroup;
  paypalEnabled: boolean = false;
  storepayEnabled:   boolean = false;
  transfEnabled:   boolean = false;
  pickupEnabled:  boolean = false;
  deliveryEnabled:   boolean = false;
  methodArr: Array<Method> = [];
  constructor(
    private fb: FormBuilder,
    private mService: MethodsService
  ) { 
    this.createForm();
    this.getAllMethods();
  }

  ngOnInit(): void {
    
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

  getAllMethods(){
    this.mService.getAllMethods().subscribe((method) => {
      this.methodArr = method.map((val) => ({
        ...val.payload.doc.data(),
        $key: val.payload.doc.id
      }) as Method)

      
      let currentMethod = this.methodArr.find((val) => {
        return val.name == 'Paypal';
      })
      if(currentMethod){
        if(currentMethod.isActive){
          console.log(currentMethod)
          this.paypalEnabled = true;
        }
      }
      else{
        currentMethod = {
          name : 'Paypal',
          isActive : true,
          methodKind : "Payment"
        }
        console.log("Paypal Not Found");
        this.mService.createMethod(currentMethod).then().catch((ERR) => {
          console.log(ERR);
        })
        this.paypalEnabled = true;
      }
      currentMethod = this.methodArr.find((val) => {
         return val.name == 'Store';
      })
      if(currentMethod){
        if(currentMethod.isActive){
            this.storepayEnabled = true;
        }
      }
      else{
        currentMethod = {
          name : 'Store',
          isActive : true,
          methodKind : "Payment"
        }
        console.log("Store Not Found");
        this.mService.createMethod(currentMethod).then().catch((ERR) => {
          console.log(ERR);
        })
        this.storepayEnabled = true;
      }

      currentMethod = this.methodArr.find((val) => {
        return val.name == 'Transfer';
      })
      if(currentMethod){
        if(currentMethod.isActive){
          this.transfEnabled = true;
        }
      }
      else{
        currentMethod = {
          name : 'Transfer',
          isActive : true,
          methodKind : "Payment"
        }
        console.log("Transfer Not Found");
        this.mService.createMethod(currentMethod).then().catch((ERR) => {
          console.log(ERR);
        })
        this.transfEnabled = true;
      }
    
      
      currentMethod = this.methodArr.find((val) => {
        return val.name == 'Pickup';
      })
      if(currentMethod){
        if(currentMethod.isActive){
          this.pickupEnabled = true;
        }
      }
      else{
        currentMethod = {
          name : 'Pickup',
          isActive : true,
          methodKind : "Delivery"
        }
        console.log("Pickup Not Found");
        this.mService.createMethod(currentMethod).then().catch((ERR) => {
          console.log(ERR);
        })
        this.pickupEnabled = true;
      }

      currentMethod = this.methodArr.find((val) => {
        return val.name == 'Delivery';
      })
      if(currentMethod){
        if(currentMethod.isActive){
          this.deliveryEnabled = true;
        }
      }
      else{
        currentMethod = {
          name : 'Delivery',
          isActive : true,
          methodKind : "Delivery"
        }
        console.log("Delivery Not Found");
        this.mService.createMethod(currentMethod).then().catch((ERR) => {
          console.log(ERR);
        })
        this.deliveryEnabled = true;
      }
      console.log(this.paypalEnabled);
      this.paymentForm.patchValue({
        paymentCheck1 : this.paypalEnabled,
        paymentCheck2 : this.storepayEnabled,
        paymentCheck3 : this.transfEnabled,
        deliveryType1 : this.deliveryEnabled,
        deliveryType2 : this.pickupEnabled
      })
    })
    
  }


  onSubmit(){
    let paypalBoolTemp:boolean = this.paymentForm.get('paymentCheck1').value;
    let storepayBoolTemp:boolean = this.paymentForm.get('paymentCheck2').value;
    let transferBoolTemp:boolean = this.paymentForm.get('paymentCheck3').value;
    let deliveryBoolTemp:boolean = this.paymentForm.get('deliveryType1').value
    let pickupBoolTemp:boolean = this.paymentForm.get('deliveryType2').value
    this.methodArr.forEach((currentMethod) => {
      switch (currentMethod.name) {
        case 'Paypal':
          currentMethod.isActive = this.paymentForm.get('paymentCheck1').value;
          this.paypalEnabled = this.paymentForm.get('paymentCheck1').value;
          this.mService.updateMethod(currentMethod,currentMethod.$key);
          this.paypalEnabled = this.paymentForm.get('paymentCheck1').value;
        break;
        case 'Store':
          currentMethod.isActive = this.paymentForm.get('paymentCheck2').value; 
          this.storepayEnabled = this.paymentForm.get('paymentCheck2').value; 
          this.mService.updateMethod(currentMethod,currentMethod.$key);
          this.storepayEnabled = this.paymentForm.get('paymentCheck2').value; 

          
        break;
        case 'Transfer':
          currentMethod.isActive = this.paymentForm.get('paymentCheck3').value; 
          this.transfEnabled = this.paymentForm.get('paymentCheck3').value; 
          this.mService.updateMethod(currentMethod,currentMethod.$key);
          this.transfEnabled = this.paymentForm.get('paymentCheck3').value; 

        break;
        case 'Pickup':
          currentMethod.isActive = this.paymentForm.get('deliveryType2').value; 
          this.pickupEnabled = this.paymentForm.get('deliveryType2').value ;
          this.mService.updateMethod(currentMethod,currentMethod.$key);
          this.pickupEnabled = this.paymentForm.get('deliveryType2').value ;

        break;
        case 'Delivery':
          currentMethod.isActive = this.paymentForm.get('deliveryType1').value; 
          this.deliveryEnabled = this.paymentForm.get('deliveryType1').value;
          this.mService.updateMethod(currentMethod,currentMethod.$key);
          this.deliveryEnabled = this.paymentForm.get('deliveryType1').value;

        break;
      
        
      }
    })
    this.paypalEnabled = paypalBoolTemp;
    this.transfEnabled = transferBoolTemp;
    this.storepayEnabled = storepayBoolTemp;
    this.pickupEnabled = pickupBoolTemp;
    this.deliveryEnabled = deliveryBoolTemp;
    this.paymentForm.disable()
  }

  enableForm(){
    this.paymentForm.enable()
  }
}
