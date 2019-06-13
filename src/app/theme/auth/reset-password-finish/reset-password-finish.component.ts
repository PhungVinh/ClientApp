import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppState} from "../../../core/core.state";
import {select, Store} from "@ngrx/store";
import {ActionChecktokenReset, ActionResetPasswordFinish} from "../../../core/auth/auth.actions";
import {AUTH_TOKEN} from "../../../core/auth/auth.constants";
import {
    selectAuth,
    selectCheckResetPasswordFinish,
    selectResetPasswordFinish
} from '../../../core/auth/auth.selectors';
import {LocalStorageService} from "../../../core/local-storage/local-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {isDefined} from '../../../shared/util/common.util';

@Component({
  selector: 'app-reset-password-finish',
  templateUrl: './reset-password-finish.component.html',
  styleUrls: ['./reset-password-finish.component.scss']
})
export class ResetPasswordFinishComponent implements OnInit {
    keyMissing = false;
    isError = false;
    doNotMatch: string;
    error: HttpErrorResponse;
    newPassword: string;
    confirmPassword: string;
    credentials;
    @ViewChild('passwordForm') passwordForm;
  constructor(
      private route: ActivatedRoute,
      public store: Store<AppState>,
      private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
      document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
      this.route.queryParams.subscribe(params => {
          this.credentials = Object.assign({}, params);
          this.store.dispatch(new ActionChecktokenReset(params));
          this.store.pipe(select(selectCheckResetPasswordFinish)).subscribe(res => {
              if (res) {
                  if (res.token) {
                      // this.localStorageService.setItem(AUTH_TOKEN, res.token);
                      this.keyMissing = true;
                  }
              }
          });

          this.store.pipe(select(selectResetPasswordFinish
          )).subscribe(err => {
              if (isDefined(err)) {
                  this.isError = true;
              }
          });
      });
  }
    changePassword() {
      if (this.passwordForm.valid) {
          if (this.newPassword !== this.confirmPassword) {
              this.error = null;
              // this.doNotMatch = 'ERROR';
              if (this.passwordForm.controls['confirmPassword']) {
                  this.passwordForm.controls['confirmPassword'].setErrors({doNotMatch: true});
              }
          } else {
             console.log('credentials', this.credentials);
             const resetInfor = {
                 Pass1: this.newPassword,
                 Pass2: this.confirmPassword,
                 codeReset: this.credentials.codeReset,
                 username: this.credentials.username
                 };
              this.store.dispatch(new ActionResetPasswordFinish(resetInfor));
              this.store.pipe(select(selectAuth)).subscribe(res => {
                  console.log(res);
                  if (res.errorReset && res.errorReset !== null) {
                      this.error =  res.errorReset.error.value.message;
                  }
              });
          }
      }
    }
}
