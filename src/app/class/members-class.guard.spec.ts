import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { membersClassGuard } from './members-class.guard';

describe('membersClassGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => membersClassGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
