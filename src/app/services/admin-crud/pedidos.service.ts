import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Invoice } from 'src/app/models/invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private invoiceCollection: AngularFirestoreCollection<Invoice>;
  constructor(private dataBase: AngularFirestore) { 
    this.invoiceCollection = this.dataBase.collection<Invoice>('invoices');
  }

  // Get ALL Invoices

  getAllInvoices(): Observable<DocumentChangeAction<Invoice>[]>{
    return this.invoiceCollection.snapshotChanges();
  }

  // Get Invoice by ID
  getInvoiceById(invoiceId: string): Observable<Action<DocumentSnapshot<Invoice>>>{
    return this.invoiceCollection.doc<Invoice>(invoiceId).snapshotChanges();
  }

  // Create a new Invoice

  createInvoice(newInvoice: Invoice): Promise<any>{
    return this.invoiceCollection.add(newInvoice);
  }

  // Update an already existing Invoice

  updateInvoice(newInvoice: Invoice, invoiceId:string): Promise<void>{
    return this.invoiceCollection.doc<Invoice>(invoiceId).update(newInvoice);
  }


  // Delete an existing Invoice

  deleteInvoice(invoiceId:string): Promise<void>{
    return this.invoiceCollection.doc<Invoice>(invoiceId).delete();
  }
}
