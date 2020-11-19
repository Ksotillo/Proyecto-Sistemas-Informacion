import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Imports de Firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
// Environment Import

import {environment} from '../environments/environment';

//Component Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { AdminPedidosComponent } from './pages/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { AdminCatalogosComponent } from './pages/admin-catalogos/admin-catalogos.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CategoriesFormComponent } from './components/forms/admin/categories-form/categories-form.component';
import { InvoiceFormComponent } from './components/forms/admin/invoice-form/invoice-form.component';
import { ProductFormComponent } from './components/forms/admin/product-form/product-form.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { SignednavBarComponent } from './components/signednav-bar/signednav-bar.component';
import { GeneralNavBarComponent } from './components/general-nav-bar/general-nav-bar.component';
import { InvoiceDescriptionComponent } from './components/invoices/invoice-description/invoice-description.component';
import { CatalogosComponent } from './components/admin/catalogos/catalogos.component';
import { AdminSideComponent } from './components/admin/catalogos/admin-side/admin-side.component';
import { AdminTableComponent } from './components/admin/catalogos/admin-table/admin-table.component';
import { ProductListComponent } from './components/lists/admin/product-list/product-list.component';
import { CrearProductosComponent } from './pages/admin-productos/crear-productos/crear-productos.component';
import { ActualizarProductosComponent } from './pages/admin-productos/actualizar-productos/actualizar-productos.component';
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';

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
    HomepageComponent,
    CategoriesFormComponent,
    InvoiceFormComponent,
    ProductFormComponent,
    ContactanosComponent,
    SignednavBarComponent,
    GeneralNavBarComponent,
    InvoiceDescriptionComponent,
    CatalogosComponent,
    AdminSideComponent,
    AdminTableComponent,
    ProductListComponent,
    CrearProductosComponent,
    ActualizarProductosComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
