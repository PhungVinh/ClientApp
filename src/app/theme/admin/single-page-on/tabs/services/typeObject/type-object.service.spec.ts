import { TestBed } from '@angular/core/testing';

import { TypeObjectService } from './type-object.service';

describe('TypeObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeObjectService = TestBed.get(TypeObjectService);
    expect(service).toBeTruthy();
  });
});
