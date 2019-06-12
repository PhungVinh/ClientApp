import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { InformationFieldEffects } from './information-field.effects';

describe('InformationFieldEffects', () => {
  let actions$: Observable<any>;
  let effects: InformationFieldEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InformationFieldEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(InformationFieldEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
