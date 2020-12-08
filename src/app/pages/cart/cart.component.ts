import { Component, OnInit } from '@angular/core';
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
  allCarts: Array<Cart> = [];
  constructor(private authHelper: AuthenticationService, private cartHelper: CartManageService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
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
            this.currentCart = possibleCart;
          }
          else{
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
