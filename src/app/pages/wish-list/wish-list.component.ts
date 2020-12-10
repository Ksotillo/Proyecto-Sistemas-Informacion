import {WishList} from 'src/app/models/wish-list';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WishListServiceService } from 'src/app/services/wish-list-service.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  currentList: WishList
  AllLists: Array<WishList>
  productList: Array<Product>
  userId: string
  constructor(private Auth: AuthenticationService, private listService: WishListServiceService){ }

  ngOnInit(): void {
    this.getList()
  }
  isAuth(){
    return this.Auth.isAuthenticated()
  }
  getList(){
    this.Auth.getCurrentUser().subscribe((actualUser) =>{
      this.userId = actualUser.uid;
      this.listService.getAllLists().subscribe((resp) =>{
        this.AllLists = resp.map((list) =>({
          ...list.payload.doc.data(),
          $key: list.payload.doc.id
        }) as WishList);

        const possibleList = this.AllLists.find((list) =>{
          return list.userID == this.userId
        })
        if (possibleList) {
          console.log("Lista Encontrada")
          this.currentList =possibleList
        } else {
          this.currentList ={
            userID: this.userId,
            products: []
          }
          this.listService.addNewList(this.currentList).then().catch((err) =>{
            console.log(err)
          })
        }
      })
    })
  }
  removeProduct(selectedProduct: Product){
    this.currentList.products.filter((item)=> {return item != selectedProduct})
    this.listService.updateList(this.currentList,this.currentList.key)
  }
  
}
