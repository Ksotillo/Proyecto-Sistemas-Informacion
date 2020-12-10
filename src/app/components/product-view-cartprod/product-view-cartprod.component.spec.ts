import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewCartprodComponent } from './product-view-cartprod.component';

describe('ProductViewCartprodComponent', () => {
  let component: ProductViewCartprodComponent;
  let fixture: ComponentFixture<ProductViewCartprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewCartprodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewCartprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
