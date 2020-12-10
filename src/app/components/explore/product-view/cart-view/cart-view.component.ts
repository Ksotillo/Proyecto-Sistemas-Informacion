import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartManageService } from 'src/app/services/cart-manage.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  @Input() cart: Cart;
  @Input() stockLimit: number
  @Input() currentProduct: Product
  productAmount:number = 0;
  currentBag: Bag;
  errorMessage: string = "";
  @Output() bagKillAproved = new EventEmitter<Bag>()
  constructor(private cartHelper: CartManageService) { }

  ngOnInit(): void {
    this.currentBag = this.cart[0];
  }
  bagOutManager(newBag: Bag){
    this.currentBag = newBag;
  }
  bagKillManager(newProds: Bag){
    if(newProds == this.currentBag){
      this.currentBag = this.cart.products.find((bagReplacement) =>{
        return bagReplacement != newProds
      })
    }
    this.bagKillAproved.emit(newProds)
  }
  addBag(){
    this.cart.products.push({
      bagContents: [],
      bagWeight: 0,
    })
    this.currentBag = this.cart.products[this.cart.products.length - 1];
    this.cartHelper.updateCart(this.cart,this.cart.$key);
  }

  reduceLimit(){
    this.productAmount = this.productAmount - 1;
  }
  incrementLimit(){
    this.productAmount = this.productAmount + 1;
  }
  addProducts(){
    if(this.productAmount != 0){
      if(this.currentBag){
        let cartCopy = this.cart
        let i: number
        if((this.currentBag.bagWeight + this.productAmount * this.currentProduct.weight) < 2){
          cartCopy.totalPrice = cartCopy.totalPrice + this.productAmount * this.currentProduct.price
          i = this.cart.products.findIndex((baggy) => {
            return baggy == this.currentBag
          })
          this.currentBag.bagWeight = this.currentBag.bagWeight + this.productAmount * this.currentProduct.weight;
          let j: number = this.currentBag.bagContents.findIndex((possibleProd) => {
            return possibleProd.productTitle == this.currentProduct.title
          })
          if(j != -1){
              this.currentBag.bagContents[j].productAmount = this.currentBag.bagContents[j].productAmount + this.productAmount;
          }
          else{
            this.currentBag.bagContents.push({
              productTitle: this.currentProduct.title,
              productAmount: this.productAmount
            })
          }
          cartCopy.products[i] = this.currentBag 
          this.productAmount = 0
          this.cartHelper.updateCart(cartCopy,cartCopy.$key)
        }
        else{
          this.addBag();
          cartCopy.totalPrice = cartCopy.totalPrice + this.productAmount * this.currentProduct.price
          i = this.cart.products.findIndex((baggy) => {
            return baggy == this.currentBag
          })
          this.currentBag.bagWeight = this.currentBag.bagWeight + this.productAmount * this.currentProduct.weight;
          let j: number = this.currentBag.bagContents.findIndex((possibleProd) => {
            return possibleProd.productTitle == this.currentProduct.title
          })
          if(j != -1){
              this.currentBag.bagContents[j].productAmount = this.currentBag.bagContents[j].productAmount + this.productAmount;
          }
          else{
            this.currentBag.bagContents.push({
              productTitle: this.currentProduct.title,
              productAmount: this.productAmount
            })
          }
          cartCopy.products[i] = this.currentBag 
          this.productAmount = 0
          this.cartHelper.updateCart(cartCopy,cartCopy.$key)
        }
      }
      else{
        this.errorMessage = "Debe Elegir una Bolsita donde guardar el Producto";
      }
    }
    {
      this.errorMessage = "Debe elegir una cantidad superior a 0 del producto a comprar";
    }
  }
}
