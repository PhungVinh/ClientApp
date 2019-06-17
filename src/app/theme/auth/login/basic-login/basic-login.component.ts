import { HttpErrorResponse } from '@angular/common/http';
import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionAuthenticate } from 'src/app/core/auth/auth.actions';
import { selectError, selectIsAuthenticated } from 'src/app/core/auth/auth.selectors';
import { AppState } from 'src/app/core/core.state';
import { Credentials } from 'src/app/shared/model/credentials.model';
import { AUTH_REMEMBER } from "../../../../core/auth/auth.constants";
import { LocalStorageService } from "../../../../core/local-storage/local-storage.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicLoginComponent implements OnInit {

  credentials: Credentials;
  isAuthenticated$: Observable<boolean>;
  error$: Observable<HttpErrorResponse>;
  err;
  isRememger: boolean;
  @ViewChild('loginForm') loginForm;

  constructor(
    public store: Store<AppState>,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService
  ) {
    this.translateService.use('vi');
  }

  ngOnInit() {
    this.credentials = new Credentials();
    const tempRemember = this.localStorageService.getItem(AUTH_REMEMBER);
    this.credentials = Object.assign({}, tempRemember);
    console.log('ngoninit login', tempRemember, this.credentials);
    // this.credentials.password = tempRemember.password;
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.error$ = this.store.pipe(select(selectError));
      this.store.pipe(select(selectError)).subscribe(err => {
        this.err = err;
        console.log('err login', this.err);
      });
      this.store.pipe(select(selectError)).subscribe(err => { console.log(err); });
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login = () => {
    // if (this.credentials.rememberMe && this.credentials.rememberMe === true) {
    //   console.log('111111111');
    //   this.localStorageService.setItem(AUTH_REMEMBER, this.credentials);
    // } else {
    //   console.log('2222');
    //   this.localStorageService.removeItem(AUTH_REMEMBER);
    // }
    console.log('doLogin', this.credentials);
    if (this.loginForm.valid) {
        console.log('doLogin', this.credentials);
        this.store.dispatch(new ActionAuthenticate({ credentials: Object.assign({}, this.credentials) }));
    }
    // this.accountService.authenticate(this.credentials).subscribe(res => {
    //   this.error = null;
    //   this.message = 'Login success\nBrowser will be auto navigate to home page';
    //   // do something to store token
    // }, res => {
    //   this.error = res.error.msg;
    // });
  }
  // onRemember($event) {
  //  if($event === true) {
  //
  //  } else {
  //
  //  }
  // }

}
