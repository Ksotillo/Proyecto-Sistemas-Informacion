import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Invoice } from 'src/app/models/invoice';
import { Product } from 'src/app/models/product';
import { PedidosService } from 'src/app/services/admin-crud/pedidos.service';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartManageService } from 'src/app/services/cart-manage.service';
declare var paypal;
@Component({
  selector: 'app-payment-init',
  templateUrl: './payment-init.component.html',
  styleUrls: ['./payment-init.component.scss']
})
export class PaymentInitComponent implements OnInit {
  @ViewChild('paypal',{static: true}) paypalElement : ElementRef;
  paymentForm: FormGroup
  paypalFinished: boolean = false
  currentUserId: string;
  currentUsername: string;
  currentCart: Cart;
  products: Array<Product> = [];
  errorMSG: string = '';
  invoiceToUpload: Invoice;
  allInvoices: Array<Invoice> = [];
  allCarts: Array<Cart> = [];
  constructor(private fb: FormBuilder, private authHelper: AuthenticationService, private cartHelper: CartManageService, private invoiceHelper: PedidosService, private route: Router, private productHelper: ProductosService) { }

  ngOnInit(): void {
    this.createForm();
    this.generatePaypal();
    this.getCart();
    this.getProducts();
  }

  createForm():void{
    this.paymentForm = this.fb.group({
      paymentMethod : '',
      deliveryMethod: ''
    })
  }

  payMethod(): void{
    this.errorMSG = "OOPS! Algo salio mal. Intenta nuevamente.(Recuerda llenar todos los Campos)";
    const pay: string = this.paymentForm.get('paymentMethod').value;
    const deliver: string = this.paymentForm.get('deliveryMethod').value;
    var date = new Date()
    if(pay && deliver){
      this.invoiceToUpload = {
        name: this.currentUsername,
        currentState: 'Pendiente',
        deliveryTipe: deliver,
        creationDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        totalPrice:this.currentCart.totalPrice,
        products:this.currentCart.products
      }
      this.invoiceHelper.createInvoice(this.invoiceToUpload);
      this.cartHelper.updateCart({
        userId: this.currentUserId,
        totalPrice: 0,
        products: [{bagWeight: 0, bagContents: []}]
      },this.currentCart.$key)
      this.invoiceToUpload.products.forEach((currentBag) => {
        currentBag.bagContents.forEach((bagProduct) => {
          let productIndex = this.products.find((currentProd) => {
            console.log(currentProd);
            return currentProd.title == bagProduct.productTitle;
          })
          productIndex.stock = productIndex.stock - bagProduct.productAmount;
          this.productHelper.updateProduct(productIndex,productIndex.$key);
        })
      })
      //TODO Añadir la parte de cambiar los productos a las WISH LISTS
      


      this.invoiceHelper.getAllInvoices().subscribe((resp) => {
        this.allInvoices = resp.map((databaseInv) => ({
          ...databaseInv.payload.doc.data(),
          $key: databaseInv.payload.doc.id
        }) as Invoice)
        let tempInvoice = this.allInvoices.find((invoiceProspect) => {
          console.log()
          return (invoiceProspect.name == this.invoiceToUpload.name && invoiceProspect.creationDate == this.invoiceToUpload.creationDate)
        })
        this.route.navigateByUrl("checkout-Finish/" + tempInvoice.$key);
      })


    }
  }

  generatePaypal(){
    paypal.Buttons({
      createOrder: (data,actions) => {
      this.errorMSG = "OOPS! Algo salio mal. Intenta nuevamente.(Recuerda llenar todos los Campos)"
      const deliver: string = this.paymentForm.get('deliveryMethod').value;
      if(!deliver){
        return null
      }
      var date = new Date()
      this.invoiceToUpload = {
        name: this.currentUsername,
        currentState: 'Pagada',
        deliveryTipe: deliver,
        creationDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        totalPrice:this.currentCart.totalPrice,
        products:this.currentCart.products
      }
      return actions.order.create({
        purchase_units : [{
          description : "Chucherías Variadas de Chucherilandia",
          amount:{
          currency_code : "USD",
          value: this.currentCart.totalPrice
          }
        }]
      });
    }, 
    onApprove: async (data, actions) =>{
      this.invoiceHelper.createInvoice(this.invoiceToUpload);
      this.invoiceToUpload.products.forEach((currentBag) => {
        currentBag.bagContents.forEach((bagProduct) => {
          let productIndex = this.products.find((currentProd) => {
            console.log(currentProd);
            return currentProd.title == bagProduct.productTitle;
          })
          productIndex.stock = productIndex.stock - bagProduct.productAmount;
          this.productHelper.updateProduct(productIndex,productIndex.$key);
          this.cartHelper.updateCart({
            userId: this.currentUserId,
            totalPrice: 0,
            products: [{bagWeight: 0, bagContents: []}]
          },this.currentCart.$key)

          this.invoiceHelper.getAllInvoices().subscribe((resp) => {
            this.allInvoices = resp.map((databaseInv) => ({
              ...databaseInv.payload.doc.data(),
              $key: databaseInv.payload.doc.id
            }) as Invoice)
            let tempInvoice = this.allInvoices.find((invoiceProspect) => {
              console.log()
              return (invoiceProspect.name == this.invoiceToUpload.name && invoiceProspect.creationDate == this.invoiceToUpload.creationDate)
            })
            this.route.navigateByUrl("checkout-Finish/" + tempInvoice.$key);
          })
        })
      })
    }
    })
    .render(this.paypalElement.nativeElement)
    this.paypalFinished = true;
    }

    getProducts(){
      this.productHelper.getAllProducts().subscribe((Products) => {
        this.products = Products.map((currentProd) => ({
          ...currentProd.payload.doc.data(),
          $key: currentProd.payload.doc.id
        }) as Product)
      })
    }
    getCart(): void{
      this.authHelper.getCurrentUser().subscribe((currentUser) => {
        this.currentUserId = currentUser.uid;
        this.currentUsername = currentUser.email;
          this.cartHelper.getAllCArts().subscribe((response) => {
            this.allCarts = response.map((cart) => ({
              ...cart.payload.doc.data(),
              $key: cart.payload.doc.id
            }) as Cart);
  
            const possibleCart = this.allCarts.find((cart) => {
              return cart.userId == this.currentUserId;
            })
  
            if(possibleCart){
              console.log("Encontré un Carrito");
              this.currentCart = possibleCart;
            }
            else{
              console.log("Creé un Carrito");
              this.currentCart = {
                userId: this.currentUserId,
                totalPrice: 0,
                products: [{bagWeight: 0, bagContents: []}]
              }
              this.cartHelper.addNewCart(this.currentCart).then().catch((ERR) => {
                console.log(ERR);
              })
            }
          } )
      })
    }
}
