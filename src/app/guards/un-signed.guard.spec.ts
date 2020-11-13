import { TestBed } from '@angular/core/testing';

import { UnSignedGuard } from './un-signed.guard';

describe('UnSignedGuard', () => {
  let guard: UnSignedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnSignedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
