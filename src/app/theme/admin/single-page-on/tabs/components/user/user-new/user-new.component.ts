import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ModalDirective } from 'angular-bootstrap-md';
import * as jwt_decode from 'jwt-decode';
import * as moment from "moment";
import { ToastyService } from 'ng2-toasty';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AUTH_TOKEN } from 'src/app/core/auth/auth.constants';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { isDefined, isDefinedProp } from 'src/app/shared/util/common.util';
import { emailMask } from 'text-mask-addons/dist/textMaskAddons';
import { ITEMS_PER_PAGE } from '../../../../../../../shared/constants/pagination.constants';
import { Authority } from '../../../../../../../shared/model/authority.model';
import { User } from '../../../../../../../shared/model/user.model';
import { State } from '../../../../../admin.state';
import { LoadCategoryDepartments } from '../../../actions/category-department.actions';
import { LoadCategoryPositions } from '../../../actions/category-position.actions';
import { ListUserByAuthorityId, UserActionTypes, UserCreate, UserServicePack, UserUpdate } from '../../../actions/user.actions';
import { selectCategoryDepartment } from '../../../selectors/CategoryDepartment.selectors';
import { selectCategoryPosition } from '../../../selectors/categoryPosition.selectors';
import { selectAuthorityPackById, selectServicePackUser } from '../../../selectors/user.selectors.';
import { CategoryDepartmentService } from '../../../services/category-department.service';
import { CategoryPositionService } from '../../../services/category-position.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit, OnDestroy {
  
  @Input() authorityLoadUser;
  @Input() fieldEncrypt;

  users: User;
  authority: Authority;

  Employee: any = [];
  categoryPosition$: Observable<any>;
  categoryDepartment$: Observable<any>;
  authorities$: Observable<any>;
  authorityPack$: Observable<any>;
  authorityPackById$: Observable<any>;
  TextSearch = '';
  IsLock: any;
  IsActive: any;
  DateFrom = '';
  DateTo = '';
  page: any;
  itemsPerPage = ITEMS_PER_PAGE;
  arrRole: any = [];
  Genderchang: Number;

  maskUsMobile = /^\+?\d{10,12}$/;
  maskMobileCountryCode = ['+', /[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  emailMask = emailMask;
  patternEmail = /^[a-zA-Z\d][\w._]*@\w+(\.[a-zA-Z\d]+)(\.[a-zA-Z]+)?$/;
  fullname = /^[ \s]+|[ \s]+$/;

  BirthDaychang: any;
  isValidate = false;

  searchAuthorityForm: FormGroup = null;
  error?: any;

  userTemp: User;
  today: NgbDateStruct;
  maxDates: NgbDateStruct;
  Token: any;
  servicePacks: any;
  listAuthority: any;

  isContinue: boolean = false;
  subscription: Subject<void> = new Subject();
  trackAction = [
    UserActionTypes.UserCreateSuccess,
    UserActionTypes.UserCreateFaild,
    UserActionTypes.UserUpdateSuccess,
    UserActionTypes.UserUpdateFaild,
    UserActionTypes.LoadUserSuccess,
    UserActionTypes.LoadUserFaild,
  ];

  @ViewChild('modalDefault') modalDefault: ModalDirective;
  @ViewChild('editForm') editForm;
  @ViewChild('elRefForm') elRefForm: ElementRef;
  constructor(
    public httpClient: HttpClient,
    public userService: UserService,
    public categoryPositionService: CategoryPositionService,
    public categoryDepartmentService: CategoryDepartmentService,
    public activeModal: NgbActiveModal,
    private store: Store<State>,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    public parserFormatter: NgbDateParserFormatter,
    private _formBuilder: FormBuilder,
    private toastyService: ToastyService,
    private localStorage: LocalStorageService,
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
          if (isDefinedProp(action, 'payload')) { // case success action have data in payload
            // do something
          }
          // reload data from list screen
          // this.store.dispatch(new LoadUsers({ pagination: { currPage: 1, recordperpage: ITEMS_PER_PAGE } }));
          if (this.authorityLoadUser) {
            this.store.dispatch(new ListUserByAuthorityId({ authorityId: this.authorityLoadUser.authorityId }));
          }
          break;
        case UserActionTypes.UserCreateFaild:
        case UserActionTypes.UserUpdateFaild:
          if (isDefinedProp(action, 'payload')) { // case error action have error data in payload
            // handle rise error return by service
            if (isDefined(action['payload'].err) && action['payload'].err instanceof HttpErrorResponse) {
              // get error header from error response
              const error = (<HttpErrorResponse>action['payload'].err).error;
              if (isDefined(error)) {
                // determine focus errors control occurs
                const focusError = error.value || null;
                if (isDefinedProp(focusError, 'errorKey')) {
                  if (focusError['errorKey'].endsWith('duplicateemail') && this.isDefinedControl('email')) {
                    this.editForm.controls['email'].setErrors({ required: true });
                    setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[name=email]`)).focus(), 0);
                  } else if (focusError['errorKey'].endsWith('duplicateusername') && this.isDefinedControl('userName')) {
                    this.editForm.controls['userName'].setErrors({ required: true });
                    setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[name=userName]`)).focus(), 0);
                  } else if (focusError['errorKey'].endsWith('duplicatephonenumber') && this.isDefinedControl('phoneNumber')) {
                    this.editForm.controls['phoneNumber'].setErrors({ required: true });
                    setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[name=phoneNumber]`)).focus(), 0);
                  } else if (focusError['errorKey'] === 'error.maxuser') {
                    this.close();
                  }
                }
              }
            }
          }
          // do something
          break;
        case UserActionTypes.LoadUserSuccess:
          if (!this.isContinue) { // close modal after refresh data
            this.close();
          } else { // process reset form to initial status
            this.clean();
            this.isContinue = false;
          }
          break;
        case UserActionTypes.LoadUserFaild:
          this.close();
          break;
      }
    });
  }

  ngOnInit() {

    // subscrible service pack
    this.store.pipe(
      takeUntil(this.subscription),
      select(selectServicePackUser)
    ).subscribe(data => {
      this.servicePacks = [];
      if (data && data.data && data.data instanceof Array) {
        (<[]>data.data).forEach(el => this.servicePacks.push(Object.assign({}, el)));
      }
      this.listAuthority = this.servicePacks;
    });

    // subscrible authority pack by id
    this.authorityPackById$ = this.store.pipe(
      takeUntil(this.subscription),
      select(selectAuthorityPackById)
    );

    // subcrible category position
    this.categoryPosition$ = this.store.pipe(select(selectCategoryPosition));
    // subscrible category department
    this.categoryDepartment$ = this.store.pipe(select(selectCategoryDepartment));

    this.searchAuthorityForm = this._formBuilder.group({
      searchInput: [''],
    });

    const date = new Date();
    this.today = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() - 1 };
    const token = this.localStorage.getItem(AUTH_TOKEN);
    var decoded = jwt_decode(token);
    this.Token = `${decoded.orgCode}_`

    // convert to Object
    this.users = Object.assign({}, this.users);
    if (this.users.id === undefined) {
      if (this.users.birthDay) {
        this.users.birthDay = moment(this.users.birthDay);
      }
      this.users.gender = 1;
      this.users.categoryCodeDepartment = '0';
      this.users.position = '0';
      this.users.isLock = false;
      this.store.dispatch(new UserServicePack({ userId: 0 }));
    } else {
      this.store.dispatch(new UserServicePack({ userId: this.users.id }));
      this.users = Object.assign({}, this.users);
      if (this.users.birthDay) {
        this.users.birthDay = moment(this.users.birthDay);
      }
    }
    // clone origin object
    this.userTemp = Object.assign({}, this.users);
    // do fetch category positions and departments
    this.store.dispatch(new LoadCategoryPositions({ pagination: {} }));
    this.store.dispatch(new LoadCategoryDepartments({ pagination: {} }));
  }

  /**
   * check control with any name want to manipulation was rendered
   * @author daibh
   * @param name name of form control
   * @readonly please confirm before change or remove this object
   */
  isDefinedControl = name => isDefined(this.editForm) && isDefined(this.editForm.controls) && isDefined(this.editForm.controls[name]);

  /**
   * search authority
   * @author vinhpv
   */
  searchAuthority() {
    const { searchInput } = this.searchAuthorityForm.value;
    if (searchInput) {
      this.servicePacks = this.listAuthority.filter((item) => item.authorityName.includes(searchInput));
    } else {
      this.servicePacks = this.listAuthority;
    }
  }

  /**
   * handle event fired by click ok on modal confirm cancel save
   * @author vinhpv
   */
  closeConfigAttr() {
    this.modalDefault.hide();
    this.close();
  }

  /**
   * handle event when keyboard was pressed in username control
   * @param event keyboard event fired
   * @author vinhpv
   */
  keyPress(event: KeyboardEvent) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      return true;
    } else if (event.keyCode >= 97 && event.keyCode <= 122) {
      return true;
    } else if (event.keyCode == 95) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * handle event when keyboard was pressed in fullname control
   * @param event keyboard event fired
   * @author vinhpv
   */
  keyPressFullname(event: KeyboardEvent) {
    if (event.keyCode >= 33 && event.keyCode <= 47) {
      return false;
    } else if (event.keyCode >= 58 && event.keyCode <= 64) {
      return false;
    } else if (event.keyCode >= 91 && event.keyCode <= 96) {
      return false;
    } else if (event.keyCode >= 123 && event.keyCode <= 126) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * handle event when keyboard was pressed in phonenumber control
   * @param event keyboard event fired
   * @author vinhpv
   */
  keyPressPhoneNumber(event: KeyboardEvent) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    } else if (event.keyCode == 43) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * handle event when keyboard was pressed in birthday control
   * @param event keyboard event fired
   * @author vinhpv
   */
  keyPressBirthDay(event: KeyboardEvent) {
    if (event.keyCode == 12) {
      return true;
    } else if (event.keyCode === 8) {
      return false;
    } else {
      return false;
    }
  }

  /**
   * handle event when clicked button save
   * @author vinhpv
   * @readonly maintained by daibh
   */
  onSave = event => {
    event.preventDefault();
    this.onSubmit();
  }

  /**
   * handle event when clicked button save and continue
   * @author vinhpv
   * @readonly maintained by daibh
   */
  onSaveAnContinue = event => {
    event.preventDefault();
    this.isContinue = true;
    this.onSubmit();
  }

  /**
   * process data when before send request to server
   * @author vinhpv
   * @readonly maintained by daibh
   */
  onSubmit = () => {
    this.users.fullName = this.users.fullName ? this.users.fullName.replace(/\s+/g, ' ') : '';
    this.users.fullName = this.users.fullName ? this.users.fullName.trim() : '';

    if (this.editForm.valid) {
      let birthDay = null;
      if (isDefined(this.users) && isDefined(this.users.birthDay)) {
        birthDay = (<moment.Moment>this.users.birthDay).format('YYYY-MM-DD');
      }

      const serviceTemp = this.servicePacks.filter(data => data.checkPack === true);
      const creatObj = {
        TblUsers: { ...this.users, birthDay },
        tblAuthority: serviceTemp,
      }
      if (this.users.id !== undefined) {

        this.store.dispatch(new UserUpdate({ user: creatObj }));
      } else {
        this.store.dispatch(new UserCreate({ user: creatObj }));
      }
    } else {
      if (this.editForm && this.editForm.controls) {
        const firstError = Object.keys(this.editForm.controls).find(c => this.editForm.controls[c] && this.editForm.controls[c].invalid);
        if (firstError) {
          setTimeout(() => (<HTMLElement>this.elRefForm.nativeElement.querySelector(`[name=${firstError}]`)).focus(), 0);
        }
      }
    }
  }

  /**
   * reset form after save data
   * @author vinhpv
   */
  clean() {
    (<NgForm>this.editForm).resetForm();
    if ((<NgForm>this.editForm).controls['categoryPosition']) {
      (<NgForm>this.editForm).controls['categoryPosition'].setValue('0');
    }
    if ((<NgForm>this.editForm).controls['categoryCodeDepartment']) {
      (<NgForm>this.editForm).controls['categoryCodeDepartment'].setValue('0');
    }
    if ((<NgForm>this.editForm).controls['isLock']) {
      (<NgForm>this.editForm).controls['isLock'].setValue(false);
    }
    if ((<NgForm>this.editForm).controls['gender']) {
      (<NgForm>this.editForm).controls['gender'].setValue(1);
    }
    this.users.gender = 1;
    this.userTemp = Object.assign({}, this.users);
  }

  /**
   * close modal
   * @author vinhpv
   */
  close() {
    this.activeModal.dismiss('cancel');
  }

  /**
   * handle event when close modal event was clicked
   * @author vinhpv
   */
  openClose() {
    if (JSON.stringify(this.users) === JSON.stringify(this.userTemp)) {
      this.close();
    } else {
      this.modalDefault.show();
    }
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}
