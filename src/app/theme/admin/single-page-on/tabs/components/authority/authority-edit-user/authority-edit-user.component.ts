import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { selectListUserByAuthorityId } from '../../../selectors/user.selectors.';
import { Observable } from 'rxjs';
import { AuthorityUserEdit } from '../../../actions/authority.actions';
import { getLoading } from '../../../selectors/authority.selectors';
import { Authority } from 'src/app/shared/model/authority.model';
import { UserNewComponent } from '../../user/user-new/user-new.component';
import * as _ from 'lodash';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-authority-edit-user',
  templateUrl: './authority-edit-user.component.html',
  styleUrls: ['./authority-edit-user.component.scss']
})
export class AuthorityEditUserComponent implements OnInit {
  authorityEditUser: FormGroup
  listNotAuthorized: any;
  listSearchNotAuthorized: any;
  listAuthorized: any;
  selectedListNotAuthorized: any;
  selectedListAuthorized: any;
  isSearchUserNotAutho: Boolean = false;
  isSearchUserAutho: Boolean = false;
  public listUser$: Observable<any>;
  loading$;
  userNotAuthorized: FormControl;
  userAuthorized: FormControl;
  txtSearchNotAutho: String = '';
  txtSearchUserAutho: String = '';
  @Input() authority: Authority;
  @ViewChild('modalIgnore') modalIgnore: ModalConfirmComponent;
  @ViewChild('modalNotChooseUser') modalNotChooseUser: ModalConfirmComponent;
  constructor(
    private store: Store<any>,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.userNotAuthorized = new FormControl('');
    this.userAuthorized = new FormControl('');
    this.listUser$ = this.store.pipe(select(selectListUserByAuthorityId));
    this.loading$ = this.store.select(getLoading);
    this.listUser$.subscribe(users => {
      if (users) {
        this.listNotAuthorized = users.filter(u => u.isGrantedAuthority === false).map(u => ({ ...u, selected: false }));
        this.listAuthorized = users.filter(u => u.isGrantedAuthority === true).map(u => ({ ...u, selected: false }));
      }

    })
  }

  moveUserToAuthorized() {
    const moveUser = this.listNotAuthorized.filter(name => name.selected).map(name => ({ ...name, selected: false }));
    const notMove = this.listNotAuthorized.filter(name => !name.selected);
    if (moveUser.length !== 0) {
      this.listNotAuthorized = [...notMove];
      this.listAuthorized = [...this.listAuthorized, ...moveUser];
      this.selectedListNotAuthorized = false;
    } else {
      this.modalNotChooseUser.showReference();
    }

  }

  moveUserToNotAuthorized() {
    const moveUser = this.listAuthorized.filter(name => name.selected).map(name => ({ ...name, selected: false }));
    const notMove = this.listAuthorized.filter(name => !name.selected);
    if (moveUser.length !== 0) {
      this.listAuthorized = [...notMove];
      this.listNotAuthorized = [...this.listNotAuthorized, ...moveUser];
      this.selectedListAuthorized = false;
    } else {
      this.modalNotChooseUser.showReference();
    }
  }

  selectAll() {
    this.listNotAuthorized = this.listNotAuthorized.map(u => ({ ...u, selected: this.selectedListNotAuthorized }));
  }
  checkIfAllSelected(e, userId) {
    this.listNotAuthorized = this.listNotAuthorized.map(user => user.userId === userId ? { ...user, selected: e } : user);
    this.selectedListNotAuthorized = this.listNotAuthorized.every(function (item: any) {
      return item.selected === true;
    })
  }

  selectAll2() {
    this.listAuthorized = this.listAuthorized.map(u => ({ ...u, selected: this.selectedListAuthorized }));
  }
  checkIfAllSelected2() {
    this.selectedListAuthorized = this.listAuthorized.every(function (item: any) {
      return item.selected === true;
    })
  }

  save() {

    const users1 = this.listAuthorized.filter(user => user.isGrantedAuthority === false).map(user => ({ UserId: user.userId, UserName: user.userName }));
    const users2 = this.listNotAuthorized.filter(user => user.isGrantedAuthority === true).map(user => ({ UserId: user.userId, UserName: user.userName }));
    if (users1.length === 0 && users2.length === 0) {
      this.modalIgnore.showReference();
    } else {

      const users = [...users1, ...users2];
      this.store.dispatch(new AuthorityUserEdit({ authorityId: this.authority.authorityId, users: users }));
      this.loading$.subscribe(loading => {
        if (loading === false) {
          this.clear();
        }
      });
    }

  }

  openSearch() {
    this.isSearchUserNotAutho = true;
  }
  openSearchUserAutho() {
    this.isSearchUserAutho = true;
  }

  search() {
    this.txtSearchNotAutho = this.userNotAuthorized.value;
  }

  searchUserAutho() {
    this.txtSearchUserAutho = this.userAuthorized.value;
  }

  listUserAutho() {
    if (this.txtSearchUserAutho) {
      return this.listAuthorized.filter(user => user.userName.includes(this.txtSearchUserAutho));
    } else {
      return this.listAuthorized;
    }
  }
  listUserNotAutho() {
    if (this.txtSearchNotAutho) {
      return this.listNotAuthorized.filter(user => user.userName.includes(this.txtSearchNotAutho));
    } else {
      return this.listNotAuthorized;
    }
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  addUser() {
    const modalRef = this.modalService.open(UserNewComponent as Component, { size: "lg", backdrop: 'static', container: '.tab-authority', });
    modalRef.componentInstance.authorityLoadUser = this.authority;
  }

}
