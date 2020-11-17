import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignednavBarComponent } from './signednav-bar.component';

describe('SignednavBarComponent', () => {
  let component: SignednavBarComponent;
  let fixture: ComponentFixture<SignednavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignednavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignednavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
