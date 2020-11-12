import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminProductosComponent } from './pages/admin-productos/admin-productos.component';
import { AdminPedidosComponent } from './pages/admin-pedidos/admin-pedidos.component';
import { AdminCatalogosComponent } from './pages/admin-catalogos/admin-catalogos.component';
import { UserinfoComponent } from './pages/userinfo/userinfo.component';
import { UserAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'login', component: LoginComponent},
  {path: 'userinfo/:userId' , component: UserinfoComponent},
  {path: 'admin/products', component: AdminProductosComponent},
  {path: 'admin/petitions', component: AdminPedidosComponent},
  {path: 'admin/categories' , component: AdminCatalogosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
