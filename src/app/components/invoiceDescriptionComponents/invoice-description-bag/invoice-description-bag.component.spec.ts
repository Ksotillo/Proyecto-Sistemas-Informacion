import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDescriptionBagComponent } from './invoice-description-bag.component';

describe('InvoiceDescriptionBagComponent', () => {
  let component: InvoiceDescriptionBagComponent;
  let fixture: ComponentFixture<InvoiceDescriptionBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDescriptionBagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDescriptionBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
