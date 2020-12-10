import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListProductComponent } from './wish-list-product.component';

describe('WishListProductComponent', () => {
  let component: WishListProductComponent;
  let fixture: ComponentFixture<WishListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishListProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
