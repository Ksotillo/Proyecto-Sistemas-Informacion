import { Injectable } from '@angular/core';
import { Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productCollection: AngularFirestoreCollection<Product>;

  constructor(private database: AngularFirestore) {
    this.productCollection = this.database.collection<Product>('products');
  }

  /*
  Obtener todos los productos
  */

  getAllProducts(): Observable<DocumentChangeAction<Product>[]> {
    return this.productCollection.snapshotChanges();
  }

  /*
  Obtener un producto por su ID
  */

  getProductByID(productID: string): Observable<Action<DocumentSnapshot<Product>>>{
    return this.productCollection.doc<Product>(productID).snapshotChanges();
  }

  /*
  Crear un producto nuevo
  */

  createProduct(newProduct: Product): Promise<any> {
    return this.productCollection.add(newProduct);
  }

  /*
  Actualizar información de un producto
  */

  updateProduct(info: Product, productID: string): Promise<any> {
    return this.productCollection.doc<Product>(productID).update(info);
  }

  /*
  Eliminar información
  */

  deleteProduct(productID: string): Promise<any> {
    return this.productCollection.doc<Product>(productID).delete();
  }
}
