import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBagViewComponent } from './cart-bag-view.component';

describe('CartBagViewComponent', () => {
  let component: CartBagViewComponent;
  let fixture: ComponentFixture<CartBagViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartBagViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBagViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
