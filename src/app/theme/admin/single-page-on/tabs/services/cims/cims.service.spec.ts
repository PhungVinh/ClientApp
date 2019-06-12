import { TestBed } from '@angular/core/testing';

import { CimsService } from './cims.service';

describe('CimsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CimsService = TestBed.get(CimsService);
    expect(service).toBeTruthy();
  });
});
