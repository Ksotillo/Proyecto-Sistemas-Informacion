import { Injectable } from '@angular/core';
import {Categories} from 'src/app/models/categories';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { __param } from 'tslib';
@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
 categories:  AngularFirestoreCollection<Categories>;
  constructor(private db: AngularFirestore) {
    this.categories = this.db.collection<Categories>('Categories')
   }
  getAllCategories(): Observable<DocumentChangeAction<Categories>[]>{
    return this.categories.snapshotChanges();
  }
  getCategorieByName(CategoryId: string):Observable<Action<DocumentSnapshot<Categories>>>{
    return this.categories.doc<Categories>(CategoryId).snapshotChanges();
  }
  createNewCategory(newCategory:Categories): Promise<DocumentReference>{
    return this.categories.add(newCategory);
  }
  updateCategory(category: Categories,docId: string): Promise<void>{
    return this.categories.doc<Categories>(docId).update(category);
  }
  deleteCategory(CategoryId: string): Promise<void>{
    return this.categories.doc<Categories>(CategoryId).delete();
  }
}
