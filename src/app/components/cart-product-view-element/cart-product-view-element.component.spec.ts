import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductViewElementComponent } from './cart-product-view-element.component';

describe('CartProductViewElementComponent', () => {
  let component: CartProductViewElementComponent;
  let fixture: ComponentFixture<CartProductViewElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartProductViewElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductViewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
