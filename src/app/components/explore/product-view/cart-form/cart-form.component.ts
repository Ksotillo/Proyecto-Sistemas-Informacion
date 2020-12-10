import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bag } from 'src/app/models/bag';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartManageService } from 'src/app/services/cart-manage.service';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.scss']
})
export class CartFormComponent implements OnInit {
  @Input() product: Product;
  @Input() stock: number;
  @Input() cart: Cart;
  @Input() currentBag: Bag;
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartManageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /*
  Crea el formulario para crear/editar un producto
  */

  createForm(): void {
    this.form = this.fb.group({
      cantidad: ['']
    });
  }

  /*
  Actualiza el carrito
  */
  
  updateCart(info: Cart) {
    this.loading = true;
    this.cartService.updateCart(info, info.$key).then(() => {
      this.loading = false;
      this.router.navigate(['explore']);
    });
  }

  /*
  Añade a la bolsa
  */
  /*
  addToBag(): void {
    if (this.stock <= this.form.get('cantidad').value) {
      if (this.currentBag.bagWeight + (this.product.weight * this.form.get('cantidad').value) <= 2 || this.currentBag.)
    }
  }*/
}
