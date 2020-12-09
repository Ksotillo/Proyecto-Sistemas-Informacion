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
import { CrearProductosComponent } from './pages/admin-productos/crear-productos/crear-productos.component';
import { ActualizarProductosComponent } from './pages/admin-productos/actualizar-productos/actualizar-productos.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { AdminMethodsComponent } from './pages/admin-methods/admin-methods.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductViewPageComponent } from './pages/product-view-page/product-view-page.component';

const routes: Routes = [
  {path: '', 
  component: HomepageComponent,
  },
  {path: 'aboutUs', component: AboutUsComponent},
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
  component: CrearProductosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/products/:product/update', 
  component: ActualizarProductosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/petitions', 
  component: AdminPedidosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'admin/categories', component: AdminCatalogosComponent,
  canActivate: [AdminAuthGuard]},
  {path: 'explore/:userInput',
  component:ExploreComponent},  
  {path: 'admin/methods', component: AdminMethodsComponent, canActivate:[AdminAuthGuard]},
  {path: 'mycart', component: CartComponent, canActivate: [UserAuthGuard]},
  {path: 'explore/product/:product',
  component:ProductViewPageComponent},  
  {path: 'admin/methods', component: AdminMethodsComponent, canActivate:[AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
