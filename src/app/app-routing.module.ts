import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCatalogosComponent } from './pages/admin-catalogos/admin-catalogos.component';
import { AdminPedidosComponent } from './pages/admin-pedidos/admin-pedidos.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
//import { userInfo } from 'os';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';

const routes: Routes = [
{path:'',component: HomepageComponent},
{path:'admin',component:UserinfoComponent},
{path:'login',component:LoginComponent},
{path:'sign-in',component:SignInComponent},
{path:'admin-pedidos',component:AdminPedidosComponent},
{path:'admin-productos',component:AdminProductosComponent},
{path:'admin-catalogos',component:AdminCatalogosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
