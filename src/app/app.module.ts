import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Imports de Firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireAuthModule} from '@angular/fire/auth'
//Environment Import

import {environment} from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Importar las funcionalidades de Firebase:

    //Primero se Configura el Modulo Principal
    AngularFireModule.initializeApp(environment.firebaseConfig),

    //Luego se inicializan los Módulos individuales
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
