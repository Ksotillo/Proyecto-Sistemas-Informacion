import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewCartbagComponent } from './product-view-cartbag.component';

describe('ProductViewCartbagComponent', () => {
  let component: ProductViewCartbagComponent;
  let fixture: ComponentFixture<ProductViewCartbagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewCartbagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewCartbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
