import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ModuleEffects } from './module.effects';

describe('ModuleEffects', () => {
  let actions$: Observable<any>;
  let effects: ModuleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(ModuleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
