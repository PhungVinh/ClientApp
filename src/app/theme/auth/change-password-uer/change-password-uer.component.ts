import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {ActionChangePassword, ActionChangePasswordUser} from "../../../core/auth/auth.actions";
import {AppState} from "../../../core/core.state";
import {selectAuth, selectIsChangePassword} from "../../../core/auth/auth.selectors";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorageService} from "../../../core/local-storage/local-storage.service";
import {AUTH_TOKEN} from "../../../core/auth/auth.constants";

@Component({
  selector: 'app-change-password-uer',
  templateUrl: './change-password-uer.component.html',
  styleUrls: ['./change-password-uer.component.scss']
})
export class ChangePasswordUerComponent implements OnInit {

    doNotMatch: string;
    error: HttpErrorResponse;
    // success: string;
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
    credentials;
    @ViewChild('passwordForm' ) passwordForm;

    constructor(
        public store: Store<AppState>,
        private ngbActiveModal: NgbActiveModal,
        private localStorageService: LocalStorageService,
    ) { }

    ngOnInit() {
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
                // this.doNotMatch = null;
                this.store.dispatch(new ActionChangePasswordUser({ Pass1: this.newPassword, Pass2: this.confirmPassword, oldPassword: this.oldPassword }));
                this.store.pipe(select(selectAuth)).subscribe(res => {
                    if(res.changePassUser && res.changePassUser !== null) {
                        this.clear();
                        this.localStorageService.setItem(AUTH_TOKEN, res.changePassUser.token);
                    } else {
                        this.error =  res.error;
                    }
                });
            }
        }
    }
    clear() {
        this.ngbActiveModal.close();
    }
}
