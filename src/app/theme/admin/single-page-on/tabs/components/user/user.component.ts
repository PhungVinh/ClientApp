import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as jwt_decode from 'jwt-decode';
import { Observable, Subscription } from 'rxjs';
import { ActionDestroyTabArgs } from 'src/app/core/auth/auth.actions';
import { AUTH_TOKEN } from 'src/app/core/auth/auth.constants';
import { selectTabArgs } from 'src/app/core/auth/auth.selectors';
import { AppState } from 'src/app/core/core.state';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { ITEMS_PER_PAGE } from '../../../../../../shared/constants/pagination.constants';
import { User } from '../../../../../../shared/model/user.model';
import { State } from '../../../../admin.state';
import { LoadCategoryDepartments } from '../../actions/category-department.actions';
import { LoadCategoryOrganizations } from '../../actions/category-organization.actions';
import { LoadUsers, ResetPasswordUser, UserAuthorityPackById, UserClearError } from '../../actions/user.actions';
import { selectCategoryOrganization } from '../../selectors/category-organization.selectors';
import { selectUser, selectError, selectResetPassword } from '../../selectors/user.selectors.';
import { UserService } from '../../services/user/user.service';
import { ResetComponent } from "./reset/reset.component";
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserNewComponent } from './user-new/user-new.component';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { environment } from '@env/environment';
import { UserDelete } from '../../actions/user.actions';
import { CustomSelectComponent } from 'src/app/shared/custom-select/custom-select.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  @ViewChild('notifyMaxUser') notifyMaxUser: ModalConfirmComponent;
  @ViewChild('modalDefault') modalDefault: ModalConfirmComponent;
  @ViewChild('CustomSelectComponent') CustomSelectComponent: CustomSelectComponent;
  public selectUser$: any;
  employeeData: any = {};


  Employee: any = [];
  searchText: any;
  public userDetial: any = [];

  categoryDepartment$: Observable<any>;

  totalItems: any;
  page: any;
  itemsPerPage = ITEMS_PER_PAGE;

  TamPerPage: any;
  previousPage: any;
  users$: Observable<any>;
  eventSubscriber: Subscription;
  fieldEncypt : any [];

  // 09/04/19
  TextSearch = '';
  IsActive: any;

  TextSearchOrganizations = '';
  IsActiveOrganizations: any;
  pageorganization: any;

  orgCode: any;
  OurrPage: any;
  Record: any;

  organizations$: Observable<any>;
  categoryOrganization$: Observable<any>;
  args$: Observable<any>;
  fromDateTemp: any;
  toDateTemp: any;
  resourceApi = `${environment.serverResource}/Account/`;
  @ViewChild('modalConfirmReset') modalConfirmReset: ModalConfirmComponent;


  constructor(
    public httpClient: HttpClient,
    public userService: UserService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public appStore: Store<AppState>,
    private store: Store<State>,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    public parserFormatter: NgbDateParserFormatter,
    private localStorage: LocalStorageService
  ) {
    // this.getListUser();
    this.previousPage = 1;
    this.page = 1;
    this.IsActive = 0;
    this.orgCode = '';
    this.TamPerPage = 10;
    this.pageorganization = 0;
    this.fromDateTemp = '';
    this.toDateTemp = '';
    this.IsActiveOrganizations = 2;
  }

  ngOnInit() {
    this.users$ = this.store.pipe(select(selectUser));
    this.categoryOrganization$ = this.store.pipe(select(selectCategoryOrganization));
    this.loadAllCategoryOrganization();
    this.store.pipe(select(selectTabArgs)).subscribe(args => {
      if (args && args.user && args.user.orgCode) {
        this.orgCode = args.user.orgCode;
        this.IsActive = '';
        this.onSearch();
      } else {
        this.loadUserAll();
      }
    });

    this.store.pipe(select(selectError)).subscribe(err => {
      if (err && err.error) {
        if (err.error.value && err.error.value.errorKey === 'error.maxuser') {
          const errorInfo = Object.assign({}, err.error.value);
          setTimeout(() => {
            this.notifyMaxUser.confirmMessage = errorInfo.message;
            this.notifyMaxUser.show();
          }, 0);
          this.store.dispatch(new UserClearError());
        }
      }
    });
  }

  ngOnDestroy() {
    this.appStore.dispatch(new ActionDestroyTabArgs({ args: { user: undefined } }));
  }

  // Hiển thị list đơn vị Organizations
  loadAllCategoryOrganization() {
    this.store.dispatch(new LoadCategoryOrganizations({
      pagination: {
      }
    }));
  }

  // hiển thị list user
  loadUserAll() {
    this.store.dispatch(new LoadUsers({
      pagination: {
        TextSearch: this.TextSearch,
        IsActive: this.IsActive,
        orgCode: this.orgCode,
        CurrPage: this.page,
        Record: this.itemsPerPage,
      }
    }));
  }


  onSearch() {
    this.page = 1;
    this.loadUserAll();
  }


  loadPage(page) {
    this.store.dispatch(new LoadUsers({
      pagination: {
        TextSearch: this.TextSearch,
        IsActive: this.IsActive,
        orgCode: this.orgCode,
        CurrPage: this.page,
        Record: this.itemsPerPage,
      }
    }));
  }


  // poup nút thêm mới user
  doAddNew($event) {
    const modalRef = this.modalService.open(UserNewComponent as Component, { size: "lg", backdrop: 'static', container: '.tab-user', });
    const user = new User();
    // user.userName = decoded.orgCode + '_';
    modalRef.componentInstance.users = user;
  }

  // poup nút sửa user
  doEditUser = (item: User, fieldEncypt: any) => {
    const modalRef = this.modalService.open(UserNewComponent as Component, { size: "lg", backdrop: 'static', container: '.tab-user' });
    const user = Object.assign({}, item);
    modalRef.componentInstance.users = user;
    modalRef.componentInstance.fieldEncypt = fieldEncypt;
    console.log('fieldEncypt', fieldEncypt)
  }

  // poup nút xóa
  doDeleteUser(id: number) {
    this.modalDefault.showReference(id);
  }
  onAcceptedDelete(id: number) {
    console.log('UserDelete', id);
    this.store.dispatch(new UserDelete({ userId: id }));
  }

  onResetPassword(user: any) {
    this.modalConfirmReset.showReference(user);
  }

  reset(item) {
    this.store.dispatch(new ResetPasswordUser({ account: item }));
    this.store.select(selectResetPassword).subscribe(res => {
      console.log('err', res);
    });
  }
}
