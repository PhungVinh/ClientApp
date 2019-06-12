import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { EncryptionEffects } from './encryption.effects';

describe('EncryptionEffects', () => {
  let actions$: Observable<any>;
  let effects: EncryptionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EncryptionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(EncryptionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
