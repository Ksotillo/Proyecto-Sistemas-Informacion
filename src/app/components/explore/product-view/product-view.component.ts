import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Product } from 'src/app/models/product';
import { ProductosService } from 'src/app/services/admin-crud/productos.service';
import { ActivatedRoute } from '@angular/router';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/service/admin-crud/categories.service';
import { Cart } from 'src/app/models/cart';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartManageService } from 'src/app/services/cart-manage.service';
import { Bag } from 'src/app/models/bag';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product;
  productID: string = '';
  stockAvailable: number;
  categories: Array<Categories>;
  userCart: Cart;
  currentBag: Bag;
  currentUserID: string;
  loading: boolean;

  constructor(
    private productService: ProductosService,
    private categoriesService: CategoriesService,
    private authService: AuthenticationService,
    private cartService: CartManageService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getURL();
    this.getCart();
  }

  /*
  Verifica si hay un usuario autenticado
  */
  
  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.currentUserID = response.uid;
        return;
      }
    });
  }

  /*
  Obtiene un producto a partir de una ruta relativa
  */

  getURL(): void {
    this.route.paramMap.subscribe((params) => {
      this.productID = params.get('product');

      if (this.productID) {
        this.loading = true;
        this.productService.getProductByID(this.productID).subscribe((item) => {
          this.product = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
        });

        this.stockAvailable = this.product.stock;

        this.categoriesService.getAllCategories().subscribe((items) => {
          this.categories = items.map((item) => ({
            ...item.payload.doc.data(),
          $key: item.payload.doc.id}) as Categories).filter((category) => 
          {
            return category.productsIds.find((id) => {return id == this.productID})
          });
        });
        this.loading = false;
      }
    });
  }

  /*
  Obtiene un producto a partir de una ruta relativa
  */
  
  getCart(): void {
    this.cartService.getAllCArts().subscribe((response) => {
      this.userCart = response.map((cart) => ({
        ...cart.payload.doc.data(),
        $key: cart.payload.doc.id
      }) as Cart).find((cart) => {return cart.userId == this.currentUserID});

      if (!this.userCart && this.currentUserID) {
        this.userCart = {
          userId: this.currentUserID,
          totalPrice: 0,
          products: [{bagWeight: 0, bagContents: []}]
        }
        this.cartService.addNewCart(this.userCart).then().catch((err) => {
          console.log(err);
        });
      }

      for (let i = 0; i < this.userCart.products.length; i++) {
        if (this.userCart.products[i].bagContents.find((product) => {return product.productTitle == this.productID})) {
          this.stockAvailable = this.stockAvailable - this.userCart.products[i].bagContents.find((product) => {return product.productTitle == this.productID})['productAmount']
        }
        else {
          continue;
        }
      }
      this.currentBag = this.userCart.products[0];
    });
  }
}
