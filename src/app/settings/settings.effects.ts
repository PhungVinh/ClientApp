import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { distinctUntilChanged, map, tap, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService } from '../core/local-storage/local-storage.service';
import { SettingsActions, SettingsActionTypes } from './settings.actions';
import { State } from './settings.model';
import { selectSettingsState } from './settings.selectors';


export const SETTINGS_KEY = 'SETTINGS';

const INIT = of('ngx-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions<SettingsActions>,
    private store: Store<State>,
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {}

  @Effect({ dispatch: false })
  persistSettings = this.actions$.pipe(
    ofType(
      SettingsActionTypes.CHANGE_LANGUAGE
    ),
    withLatestFrom(this.store.pipe(select(selectSettingsState))),
    tap(([action, settings]) =>
      this.localStorageService.setItem(SETTINGS_KEY, settings)
    )
  );

  @Effect({ dispatch: false })
  setTranslateServiceLanguage = this.store.pipe(
    select(selectSettingsState),
    map(settings => settings.language),
    distinctUntilChanged(),
    tap(language => {
      this.translateService.use(language);
      this.translateService.getTranslation('vi').subscribe(data => console.table('data:', data, this.translateService.instant('login.title')));
      console.log(this.translateService.instant('login.title'));
    })
  );

  // @Effect({ dispatch: false })
  // setTitle = merge(
  //   this.actions$.pipe(ofType(SettingsActionTypes.CHANGE_LANGUAGE)),
  //   this.router.events.pipe(filter(event => event instanceof ActivationEnd))
  // ).pipe(
  //   tap(() => {
  //     this.titleService.setTitle(
  //       this.router.routerState.snapshot.root,
  //       this.translateService
  //     );
  //   })
  // );
}
