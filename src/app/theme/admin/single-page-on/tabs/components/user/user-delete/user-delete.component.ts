import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { State } from '../../../../../admin.state';
import { UserDelete } from '../../../actions/user.actions';
import { selectUserUpdate } from '../../../selectors/user.selectors.';
import { User } from '../../../../../../../shared/model/user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {
  users: User;
  constructor(
    private activeModal: NgbActiveModal,
    private store: Store<State>
  ) { }

  ngOnInit() {
  }
  clear() {
    this.activeModal.close();
  }

  delete() {
    this.store.dispatch(new UserDelete({userId: this.users.id}));
    this.store.pipe(select(selectUserUpdate)).subscribe(isLoading => {
        if (isLoading) {
            this.clear();
        }
    });
}

}
