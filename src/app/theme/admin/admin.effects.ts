import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { selectSettingsState, SettingsState, State } from 'src/app/settings';
import { AdminState } from './admin.state';

@Injectable()
export class AdminEffects {
  constructor(
    private store$: Store<AdminState>,
    private store: Store<State>,
    private router: Router,
    private translateService: TranslateService
  ) {}

  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettingsState),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => {
      this.translateService.use(language);
    })
  );

}
