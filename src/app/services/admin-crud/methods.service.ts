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
import { Method } from 'src/app/models/method';
@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  private methodCollection: AngularFirestoreCollection<Method> 
  constructor(private dataBase: AngularFirestore) { 
    this.methodCollection = dataBase.collection<Method>('methods');
  }

  //Get All Methods

  getAllMethods(): Observable<DocumentChangeAction<Method>[]>{
    return this.methodCollection.snapshotChanges();
  }


  //Create a new Method

  createMethod(newMethod: Method): Promise<any>{
    return this.methodCollection.add(newMethod);
  }


  updateMethod(newMethod: Method, invoiceId: string): Promise<any>{
    return this.methodCollection.doc<Method>(invoiceId).update(newMethod);
  }
}
