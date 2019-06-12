import { TestBed } from '@angular/core/testing';

import { CategoryOrganizationService } from './category-organization.service';

describe('CategoryOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryOrganizationService = TestBed.get(CategoryOrganizationService);
    expect(service).toBeTruthy();
  });
});
