import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDescriptionProductComponent } from './invoice-description-product.component';

describe('InvoiceDescriptionProductComponent', () => {
  let component: InvoiceDescriptionProductComponent;
  let fixture: ComponentFixture<InvoiceDescriptionProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDescriptionProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDescriptionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
