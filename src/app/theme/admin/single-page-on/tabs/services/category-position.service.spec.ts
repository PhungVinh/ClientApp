import { TestBed } from '@angular/core/testing';

import { CategoryPositionService } from './category-position.service';

describe('CategoryPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryPositionService = TestBed.get(CategoryPositionService);
    expect(service).toBeTruthy();
  });
});
