import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
@Injectable({
  providedIn: 'root'
})
export class CartManageService {
  private cartCollection: AngularFirestoreCollection<Cart>
  constructor(private dataBase: AngularFirestore) { 
    this.cartCollection = this.dataBase.collection<Cart>('carts');
  }

  //Get All Carts

  getAllCArts():Observable<DocumentChangeAction<Cart>[]>{
    return this.cartCollection.snapshotChanges();
  }

  //Add a New Cart for a Client

  addNewCart(newCart: Cart): Promise<any>{
    return this.cartCollection.add(newCart);
  }

  //Update Existing Cart

  updateCart(newCart: Cart, cartId: string):Promise<any>{
    return this.cartCollection.doc<Cart>(cartId).update(newCart);
  }
}
