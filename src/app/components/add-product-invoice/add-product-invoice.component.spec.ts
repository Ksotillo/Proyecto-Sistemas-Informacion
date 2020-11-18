import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductInvoiceComponent } from './add-product-invoice.component';

describe('AddProductInvoiceComponent', () => {
  let component: AddProductInvoiceComponent;
  let fixture: ComponentFixture<AddProductInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
