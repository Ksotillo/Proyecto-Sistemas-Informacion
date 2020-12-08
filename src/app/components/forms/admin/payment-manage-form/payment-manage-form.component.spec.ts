import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManageFormComponent } from './payment-manage-form.component';

describe('PaymentManageFormComponent', () => {
  let component: PaymentManageFormComponent;
  let fixture: ComponentFixture<PaymentManageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentManageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
