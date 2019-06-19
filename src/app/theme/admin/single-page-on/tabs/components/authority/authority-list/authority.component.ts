import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadAuthorities, LoadListAuthorityFilter, LoadAllRole, LoadAllAuthority, CopyAuthority, DeleteAuthority } from '../../../actions/authority.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorityDeleteComponent } from '../authority-delete/authority-delete.component';
import { getAuthority, selectPaging } from '../../../selectors/authority.selectors';
import { AuthorityAddComponent } from '../authority-form/authority-form.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthorityEditUserComponent } from '../authority-edit-user/authority-edit-user.component';
import { ListUserByAuthorityId } from '../../../actions/user.actions';
import { PER_PAGE } from 'src/app/shared/constants/authority.constants';
import { LoadModules } from '../../../actions/module.actions';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.scss']
})
export class AuthorityComponent implements OnInit {

  public authorities$: Observable<any>;
  public paging$: Observable<any>;
  public perPage = PER_PAGE;
  searchAuthorityForm: FormGroup = null;
  page = 1;
  @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  constructor(
    private store: Store<any>,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder
    ) {
     
  }

  ngOnInit() {
    this.authorities$ = this.store.pipe(select(getAuthority));
    this.searchAuthorityForm = this._formBuilder.group({
      searchInput: [''],
    });
    
    this.paging$ = this.store.pipe(select(selectPaging));
    this.paging$.subscribe(p => {
      this.page = p.currPage;
    })
    this.loadPage(1);
  }

  /**
   * Các action chưa comment theo coding convention nhé
   * nhớ bỏ mấy cái attribute class tự sinh bởi ts combine nữa nhé
   * 
   * @author daibh
   * @param authority 
   */
  updateAuthority(authority) {
    const modalRef = this.modalService.open(AuthorityAddComponent as Component, { size: 'lg', backdrop: 'static', container: '.tab-authority' });
    this.store.dispatch(new LoadAllAuthority({ textSearch: '', currPage: 0, recordperpage: this.perPage }));
    this.store.dispatch(new CopyAuthority({ id: authority.authorityId, parentCode: ''}))
    this.store.dispatch(new LoadModules());
    modalRef.componentInstance.authority = { ...authority };
  }

  addAuthority() {
    this.store.dispatch(new LoadAllRole({ ParentCode: ''}));
    this.store.dispatch(new LoadAllAuthority({ textSearch: '', currPage: 0, recordperpage: this.perPage }));
    this.store.dispatch(new LoadModules());
    this.modalService.open(AuthorityAddComponent as Component, { size: 'lg', backdrop: 'static', container: '.tab-authority' });
  }

  deleteAuthority(id: number) {
    this.modalConfirm.showReference(id);
  }

  onAcceptedDelete(authority) {
    console.log('sfsdfsd',authority);
    this.store.dispatch(new DeleteAuthority({ authority: authority }));
  }

  search() {
    const { searchInput } = this.searchAuthorityForm.value;
    this.store.dispatch(new LoadListAuthorityFilter({ filter: { textSearch: searchInput } }));
  }
  loadPage(page) {
    this.store.dispatch(new LoadAuthorities({ textSearch: '', currPage: page, recordperpage: this.perPage }));
  }
  
  /**
   * Cái modal này em cho hiển thị trong tab cho anh nhé. Mà nhớ xóa hết console log trước khi assign cho anh review @@
   * 
   * @author daibh
   * @param authority 
   */
  editUserAuthority(authority) {
    this.store.dispatch(new ListUserByAuthorityId({ authorityId: authority.authorityId}));
    const modalRef = this.modalService.open(AuthorityEditUserComponent as Component, { size: 'lg', backdrop: 'static', container: '.tab-authority' });
    modalRef.componentInstance.authority = authority;
  }

}
