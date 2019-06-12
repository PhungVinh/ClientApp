import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteAuthority } from '../../../actions/authority.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-authority-delete',
  templateUrl: './authority-delete.component.html',
  styleUrls: ['./authority-delete.component.scss']
})
export class AuthorityDeleteComponent {
  @Input() authority;

  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<any>
    ) { }
  close() {
    this.activeModal.dismiss('close modal');
  }

  delete() {
    this.store.dispatch(new DeleteAuthority({ authority: this.authority }));
    this.close();
  }

}
