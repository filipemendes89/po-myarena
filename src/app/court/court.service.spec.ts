import { TestBed } from '@angular/core/testing'

import { CourtService } from './court.service'

describe('CourtsService', () => {
  let service: CourtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
