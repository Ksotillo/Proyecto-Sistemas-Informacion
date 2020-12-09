import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bag } from 'src/app/models/bag';
import { Cart } from 'src/app/models/cart';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartManageService } from 'src/app/services/cart-manage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentUserId: string;
  currentCart: Cart;
  currentBag: Bag;
  allCarts: Array<Cart> = [];
  constructor(private authHelper: AuthenticationService, private cartHelper: CartManageService, private routeHelp: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void{
    this.authHelper.getCurrentUser().subscribe((currentUser) => {
      this.currentUserId = currentUser.uid;
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
          this.currentBag = this.currentCart.products[0];
        } )
    })
  }

  goToCheckout(): void{
    this.routeHelp.navigateByUrl("checkout-init")
  }
  bagOutManager(bagIN:Bag) : void{
    this.currentBag = bagIN;
  }
  routeToExplore(): void{
    this.routeHelp.navigateByUrl("/explore/")
  }
}
