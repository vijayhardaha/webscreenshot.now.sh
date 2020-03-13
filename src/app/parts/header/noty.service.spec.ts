import { TestBed } from '@angular/core/testing';

import { NotyService } from './noty.service';

describe('NotyService', () => {
  let service: NotyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
