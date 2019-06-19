import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ActionDestroyTabArgs } from 'src/app/core/auth/auth.actions';
import { selectTabArgs } from 'src/app/core/auth/auth.selectors';
import { AppState } from 'src/app/core/core.state';
import { CustomSelectComponent } from 'src/app/shared/custom-select/custom-select.component';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { Pagination } from 'src/app/shared/model/pagination.model';
import { isDefinedProp } from 'src/app/shared/util/common.util';
import { ITEMS_PER_PAGE } from '../../../../../../shared/constants/pagination.constants';
import { User } from '../../../../../../shared/model/user.model';
import { State } from '../../../../admin.state';
import { LoadCategoryOrganizations } from '../../actions/category-organization.actions';
import { LoadUsers, ResetPasswordUser, UserActionTypes, UserClearError, UserDelete } from '../../actions/user.actions';
import { selectCategoryOrganization } from '../../selectors/category-organization.selectors';
import { selectError, selectUser } from '../../selectors/user.selectors.';
import { UserService } from '../../services/user/user.service';
import { UserNewComponent } from './user-new/user-new.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  selectUser$: any;
  employeeData: any = {};
  Employee: any = [];
  searchText: any;
  userDetial: any = [];
  categoryDepartment$: Observable<any>;
  totalItems: any;
  page: any = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  previousPage: any;
  users$: Observable<any>;
  eventSubscriber: Subscription;
  fieldEncrypt: any[];

  // 09/04/19
  TextSearch = '';
  IsActive: any = 0;

  TextSearchOrganizations = '';
  IsActiveOrganizations: any;

  orgCode: any = '';
  OurrPage: any;
  Record: any;

  organizations$: Observable<any>;
  categoryOrganization$: Observable<any>;
  args$: Observable<any>;
  fromDateTemp: any;
  toDateTemp: any;
  resourceApi = `${environment.serverResource}/Account/`;

  // maintained by daibh
  subscription: Subject<void> = new Subject();
  trackAction = [
    UserActionTypes.UserCreateSuccess,
    UserActionTypes.UserUpdateSuccess,
    UserActionTypes.UserDelete
  ];

  @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  @ViewChild('notifyMaxUser') notifyMaxUser: ModalConfirmComponent;
  @ViewChild('modalDefault') modalDefault: ModalConfirmComponent;
  @ViewChild('CustomSelectComponent') CustomSelectComponent: CustomSelectComponent;
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
    private actionsSubject$: ActionsSubject
  ) {
    // track for save action status
    this.actionsSubject$.pipe(
      takeUntil(this.subscription), // only hold on subscrible when subscription alive
      filter((action) => this.trackAction.some(a => a === action.type))
    ).subscribe((action) => {
      switch (action.type) {
        case UserActionTypes.UserCreateSuccess:
        case UserActionTypes.UserUpdateSuccess:
        case UserActionTypes.UserDelete:
          let pagination: Pagination = { currPage: 1, recordperpage: ITEMS_PER_PAGE };
          if (isDefinedProp(action, 'payload')) { // case success action have data in payload
            // do something
            if (isDefinedProp((<any>action).payload, 'param')) {
              pagination = (<any>action).payload['param'];
            }
          }
          // reload data from list screen
          this.store.dispatch(new LoadUsers({ pagination }));
          break;
      }
    });

  }

  ngOnInit() {
    this.users$ = this.store.pipe(
      takeUntil(this.subscription),
      select(selectUser)
    );
    this.categoryOrganization$ = this.store.pipe(select(selectCategoryOrganization));
    // need to re-check function and usage below line code
    this.store.dispatch(new LoadCategoryOrganizations({ pagination: {} }));
    this.store.pipe(
      takeUntil(this.subscription),
      select(selectTabArgs)
    ).subscribe(args => {
      if (args && args.user && args.user.orgCode) {
        this.orgCode = args.user.orgCode;
        this.IsActive = '';
        this.onSearch();
      } else {
        this.loadUserAll();
      }
    });

    this.store.pipe(
      takeUntil(this.subscription),
      select(selectError)
    ).subscribe(err => {
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

  /**
   * process fetch all data
   * @author vinhpv
   */
  loadUserAll() {
    this.store.dispatch(new LoadUsers({
      pagination: {
        TextSearch: this.TextSearch,
        IsActive: this.IsActive,
        orgCode: this.orgCode,
        currPage: this.page,
        recordperpage: this.itemsPerPage,
      }
    }));
  }

  /**
   * handle event when searched
   * @author vinhpv
   */
  onSearch() {
    this.page = 1;
    this.loadUserAll();
  }

  /**
   * handle event when clicked on pagination
   * @param page page will be navigate
   * @author vinhpv
   */
  loadPage(page) {
    this.store.dispatch(new LoadUsers({
      pagination: {
        TextSearch: this.TextSearch,
        IsActive: this.IsActive,
        orgCode: this.orgCode,
        currPage: this.page,
        recordperpage: this.itemsPerPage,
      }
    }));
  }

  /**
   * handle event when clicked on button create user
   * @param $event mouse event
   * @author vinhpv
   */
  doAddNew($event) {
    const modalRef = this.modalService.open(UserNewComponent as Component, { size: "lg", backdrop: 'static', container: '.tab-user', });
    const user = new User();
    modalRef.componentInstance.users = user;
  }

  /**
   * handle event when click on button edit special user
   * @param item user want to edit
   * @param fieldEncrypt field that be determined encrypt
   * @author vinhpv
   */
  doEditUser = (item: User, fieldEncrypt: any) => {
    const modalRef = this.modalService.open(UserNewComponent as Component, { size: "lg", backdrop: 'static', container: '.tab-user' });
    const user = Object.assign({}, item);
    modalRef.componentInstance.users = user;
    modalRef.componentInstance.fieldEncrypt = fieldEncrypt;
  }

  /**
   * handle event when clicked on button delete special user
   * @param id id of user want to confirm delete
   * @author vinhpv
   */
  doDeleteUser(id: number) {
    this.modalDefault.showReference(id);
  }

  /**
   * handle fired event accept delete special user
   * @param id id of user want to delete
   * @author vinhpv
   */
  onAcceptedDelete(id: number) {
    this.store.dispatch(new UserDelete({ userId: id }));
  }

  /**
   * handle event when clicked on button reset password for special user
   * @param user user want to confirm reset password
   * @author huongpt1
   */
  doResetPassword(user: any) {
    this.modalConfirmReset.showReference(user);
  }

  /**
   * handle fired event accept reset password for user
   * @param item item want to delete
   * @author huongpt1
   */
  onResetPassword(item) {
    this.store.dispatch(new ResetPasswordUser({ account: item }));
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
    this.appStore.dispatch(new ActionDestroyTabArgs({ args: { user: undefined } }));
  }

}
