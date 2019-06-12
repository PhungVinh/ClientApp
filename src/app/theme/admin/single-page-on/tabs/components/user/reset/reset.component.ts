import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {ResetPasswordUser} from "../../../actions/user.actions";
import {selectResetPassword} from "../../../selectors/user.selectors.";
import {AUTH_TOKEN} from "../../../../../../../core/auth/auth.constants";
import {AppState} from "../../../../../../../core/core.state";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
    account;
    error;
  constructor(
      private ngbActiveModal : NgbActiveModal,
      private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('account', this.account);
  }
    reset() {
      this.store.dispatch(new ResetPasswordUser({account: this.account}));
      this.store.select(selectResetPassword).subscribe(res =>{
          console.log('err', res);
          if(res.reset && res.reset !== null) {
              this.clear();
          } else {
              this.error =  res.resetErr;
          }
      });
    }
    clear() {
     this.ngbActiveModal.close();
    }
}
