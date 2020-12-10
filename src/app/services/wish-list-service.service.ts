import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WishList } from '../models/wish-list';

@Injectable({
  providedIn: 'root'
})
export class WishListServiceService {
  private wishListCollection: AngularFirestoreCollection<WishList>
  constructor(private database: AngularFirestore) {
    this.wishListCollection = this.database.collection<WishList>('wishList');
   }
   //gets all the wishLists
  getAllLists():Observable<DocumentChangeAction<WishList>[]>{
    return this.wishListCollection.snapshotChanges()
  }
  //add a new List
  addNewList(list: WishList){
    return this.wishListCollection.add(list)
  }
  //Updates an Existing list
  updateList(newList: WishList,listID: string){
    return this.wishListCollection.doc<WishList>(listID).update(newList)
  }
}
