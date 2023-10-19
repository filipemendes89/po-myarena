import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { peopleGuard } from './people.guard';

describe('peopleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => peopleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
