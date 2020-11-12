import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Imports de Firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
// Environment Import

import {environment} from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { AdminPedidosComponent } from './pages/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { AdminCatalogosComponent } from './pages/admin-catalogos/admin-catalogos.component';
import { HomepageComponent } from './pages/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignInComponent,
    LoginComponent,
    UserinfoComponent,
    AdminPedidosComponent,
    AdminProductosComponent,
    AdminCatalogosComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Importar las funcionalidades de Firebase:

    // Primero se Configura el Modulo Principal
    AngularFireModule.initializeApp(environment.firebaseConfig),

    // Luego se inicializan los Módulos individuales
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
