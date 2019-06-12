import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from "../../../core/core.state";
import {select, Store} from "@ngrx/store";
import {ActionAuthenticate, ActionChangePassword} from "../../../core/auth/auth.actions";
import {selectAccount, selectIsChangePassword} from "../../../core/auth/auth.selectors";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../login/basic-login/basic-login.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    doNotMatch: string;
    error: string;
    success: string;
    // account: any;
    newPassword: string;
    confirmPassword: string;
    credentials;
    @ViewChild('passwordForm') passwordForm;
    @ViewChild('newPasswordInput') newPasswordInput;

  constructor(  public store: Store<AppState>) { }

  ngOnInit() {
      // this.store.pipe(select(selectAccount)).subscribe(data => {
      //     this.account =  Object.assign({}, data);
      // });
  }
    changePassword() {
      console.log('click', this.passwordForm, this.newPasswordInput.submitted );
      if (this.passwordForm.valid) {
          if (this.newPassword !== this.confirmPassword) {
              this.error = null;
              this.success = null;
              // this.doNotMatch = 'ERROR';
              if (this.passwordForm.controls['confirmPassword']) {
                  this.passwordForm.controls['confirmPassword'].setErrors({doNotMatch: true});
              }
          } else {
              // this.doNotMatch = null;
              this.store.dispatch(new ActionChangePassword({ Pass1: this.newPassword, Pass2: this.confirmPassword }));
              this.store.pipe(select(selectIsChangePassword)).subscribe(res => {
                  console.log('err', res);
                  if (res && res.error !== null) {
                      this.success = null;
                      if (res.error.value) {
                          this.error =  res.error.value.message;
                      }
                  }
              });
          }
      }
    }
    // clear() {
    //   this.error = 'Bắt buộc thay đổi mật khẩu trong lần đăng nhập đầu tiên';
    // }
}
