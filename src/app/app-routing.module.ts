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
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { UnSignedGuard } from './guards/un-signed.guard';

const routes: Routes = [
  {path: '', 
  component: HomepageComponent,
  },
  {path: 'signin', 
  component: SignInComponent,
  canActivate: [UnSignedGuard]
  },
  {path: 'login', 
  component: LoginComponent,
  canActivate: [UnSignedGuard]},
  {path: 'userinfo/:userId' , 
  component: UserinfoComponent,
  canActivate: [UserAuthGuard]},
  {path: 'admin/products', 
  component: AdminProductosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/products/create', 
  component: AdminProductosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/products/:product/update', 
  component: AdminProductosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/petitions', 
  component: AdminPedidosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/categories', component: AdminCatalogosComponent,
  canActivate: [AdminAuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
