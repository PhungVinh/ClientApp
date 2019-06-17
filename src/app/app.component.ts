import { Component, OnInit, Injector } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/auth/auth.service';
import { Store } from '@ngrx/store';
import { ActionAuthLogout, ActionAuthExpired } from './core/auth/auth.actions';
import { parseJwt, isDefined } from './shared/util/common.util';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { AUTH_TOKEN } from './core/auth/auth.constants';
import { AppState } from './core/core.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Able Pro 7 6';

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private injector: Injector,
    private localStorageService: LocalStorageService,
    public store: Store<AppState>
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        if (!this.router.navigated) { // Browser refresh handle
          const jwt = this.localStorageService.getItem(AUTH_TOKEN);
          if (isDefined(jwt)) {
            let exp = parseJwt(jwt).exp * 1000 - Date.now();
            exp = exp > 0 ? exp : 0;
            setTimeout(() => {
              this.localStorageService.removeItem(AUTH_TOKEN);
              this.injector.get(Store).dispatch(new ActionAuthLogout());
            }, exp);
          }
        }
        if (evt.restoredState) {
          if (evt.url.startsWith('/auth/login')) {
            this.store.dispatch(new ActionAuthExpired());
          }
        }
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
