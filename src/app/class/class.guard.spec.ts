import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { classGuard } from './class.guard';

describe('classGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => classGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
