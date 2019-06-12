import { TestBed } from '@angular/core/testing';

import { CategoryDepartmentService } from './category-department.service';

describe('CategoryDepartmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryDepartmentService = TestBed.get(CategoryDepartmentService);
    expect(service).toBeTruthy();
  });
});
