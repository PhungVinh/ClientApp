import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { NgbActiveModal, NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ModalDirective } from 'angular-bootstrap-md';
import * as jwt_decode from 'jwt-decode';
import * as moment from "moment";
import { ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs';
import { AUTH_TOKEN } from 'src/app/core/auth/auth.constants';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { PER_PAGE } from 'src/app/shared/constants/authority.constants';
import { isDefined } from 'src/app/shared/util/common.util';
import { emailMask } from 'text-mask-addons/dist/textMaskAddons';
import { ITEMS_PER_PAGE } from '../../../../../../../shared/constants/pagination.constants';
import { Authority } from '../../../../../../../shared/model/authority.model';
import { User } from '../../../../../../../shared/model/user.model';
import { State } from '../../../../../admin.state';
import { LoadAuthorities, LoadListAuthorityFilter } from '../../../actions/authority.actions';
import { LoadCategoryDepartments } from '../../../actions/category-department.actions';
import { LoadCategoryPositions } from '../../../actions/category-position.actions';
import {
  UserCreate,
  UserUpdate,
  ListUserByAuthorityId,
  UserServicePack
} from '../../../actions/user.actions';
import { getAuthority } from '../../../selectors/authority.selectors';
import { selectCatrgoryDepartment } from '../../../selectors/CategoryDepartment.selectors';
import { selectCatrgoryPosition } from '../../../selectors/categoryPosition.selectors';
import {
  selectError,
  selectUserUpdate,
  selectAuthorityPack,
  selectAuthorityPackById,
  selectUserById,
  selectServicePackUser
} from '../../../selectors/user.selectors.';
import { CategoryDepartmentService } from '../../../services/category-department.service';
import { CategoryPositionService } from '../../../services/category-position.service';
import { UserService } from '../../../services/user/user.service';
import { DOCUMENT } from '@angular/common';
import * as $ from 'jquery';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { computeStyle } from '@angular/animations/browser/src/util';
import { UserAuthorityPack, UserAuthorityPackById } from '../../../actions/user.actions';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {
  @ViewChild('modalDefault') modalDefault: ModalDirective;

  @ViewChild('editForm') editForm;
  // @ViewChild('fullNameInput') fullNameInput;
  @Input() authorityLoadUser;
  @Input() fieldEncypt;

  users: User;
  authority: Authority;

  Employee: any = [];
  categoryPosition$: Observable<any>;
  categoryDepartment$: Observable<any>;
  public authorities$: Observable<any>;
  public authorityPack$: Observable<any>;
  public authorityPackById$: Observable<any>;
  TextSearch = '';
  IsLock: any;
  IsActive: any;
  DateFrom = '';
  DateTo = '';
  page: any;
  itemsPerPage = ITEMS_PER_PAGE;
  public arrRole: any = [];
  public Genderchang: Number;

  public maskUsMobile = /^\+?\d{10,12}$/;
  public maskMobileCountryCode = ['+', /[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public emailMask = emailMask;
  public patternEmail = /^[a-zA-Z\d][\w._]*@\w+(\.[a-zA-Z\d]+)(\.[a-zA-Z]+)?$/;
  public fullname = /^[ \s]+|[ \s]+$/;

  BirthDaychang: any;
  isValidate = false;

  searchAuthorityForm: FormGroup = null;
  private txtSearch: string;
  public perPage = PER_PAGE;
  error?: any;

  userTemp: User;
  today: NgbDateStruct;
  maxDates: NgbDateStruct;
  Token: any;
  // authorityPack: any;
  servicePacks: any;
  listAuthority: any;


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
    

  ) {

  }

  ngOnInit() {
    console.log('fieldEncypt2324', this.fieldEncypt);
    console.log('jksdfvoj-2kjs', (<NgForm>this.editForm));
    console.log('thisfjk.userdfe',this.users);
    this.store.pipe(select(selectServicePackUser)).subscribe(data => {
      console.log('vinh-serd-user', data);
      this.servicePacks = [];
      if (data && data.data && data.data instanceof Array) {
        (<[]>data.data).forEach(el => this.servicePacks.push(Object.assign({}, el)));
      }
      this.listAuthority = this.servicePacks;
    });

    this.authorityPackById$ = this.store.pipe(select(selectAuthorityPackById));

    this.searchAuthorityForm = this._formBuilder.group({
      searchInput: [''],
    });
    const date = new Date();
    this.today = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() -1 };
    const token = this.localStorage.getItem(AUTH_TOKEN);
    var decoded = jwt_decode(token);
    this.Token = `${decoded.orgCode}_`
    console.log('this.Token', this.Token);
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
    }
    else {
      this.store.dispatch(new UserServicePack({ userId: this.users.id }));
      this.users = Object.assign({}, this.users);
      if (this.users.birthDay) {
        this.users.birthDay = moment(this.users.birthDay);
      }
    }
    this.userTemp = Object.assign({}, this.users);

    this.categoryPosition$ = this.store.pipe(select(selectCatrgoryPosition));
    this.loadCategoryPosition();
    this.categoryDepartment$ = this.store.pipe(select(selectCatrgoryDepartment));
    this.loadCategoryDepartment();

  }


  searchAuthority() {
    const { searchInput } = this.searchAuthorityForm.value;
    if (searchInput) {
      this.servicePacks = this.listAuthority.filter((item) => item.authorityName.includes(searchInput));
    } else {
      this.servicePacks = this.listAuthority;
    }
   
  }



  CloseConfigAttr() {
    this.modalDefault.hide();
    this.close();
  }


  listRole() {
    if (this.txtSearch) {
      // console.log('txtSearch111', this.txtSearch);
      return this.arrRole.filter(role => {
        return role.authorityName.toLowerCase().includes(this.txtSearch.toLowerCase())
      });
    } else {
      return this.arrRole;
    }

  }

  changeLock(e) {

  }
  keyPress(event: KeyboardEvent) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    }
    else if (event.keyCode >= 65 && event.keyCode <= 90) {
      return true;
    }
    else if (event.keyCode >= 97 && event.keyCode <= 122) {
      return true;
    }
    else if (event.keyCode == 95) {
      return true;
    }
    else {
      return false;
    }
  }

  keyPressFullname(event: KeyboardEvent) {
    if (event.keyCode >= 33 && event.keyCode <= 47) {
      return false;
    }
    else if (event.keyCode >= 58 && event.keyCode <= 64) {
      return false;
    }
    else if (event.keyCode >= 91 && event.keyCode <= 96) {
      return false;
    }
    else if (event.keyCode >= 123 && event.keyCode <= 126) {
      return false;
    }
    else {
      return true;
    }
  }
  keyPressPhoneNumber(event: KeyboardEvent) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
      return true;
    }
    else if (event.keyCode == 43) {
      return true;
    }
    else {
      return false;
    }
  }

  keyPressBirthDay(event: KeyboardEvent) {
    if (event.keyCode == 12) {
      return true;
    }
    else if (event.keyCode === 8) {
      return false;
    }
    else {
      return false;
    }
  }


  save() {

    this.users.fullName = this.users.fullName.replace(/\s+/g, ' ');
    this.users.fullName = this.users.fullName.trim();



    if (this.editForm.valid) {
      let birthDay = null;
      if (isDefined(this.users) && isDefined(this.users.birthDay)) {
        birthDay = (<moment.Moment>this.users.birthDay).format('YYYY-MM-DD');
      }

      const serviceTemp = this.servicePacks.filter(data => data.checkPack === true);
      console.log('serviceTemp',serviceTemp);
      const creatObj = {
        TblUsers: { ...this.users, birthDay },
        tblAuthority: serviceTemp,
      }
      if (this.users.id !== undefined) {

        this.store.dispatch(new UserUpdate({ user: creatObj }));
      } else {
        this.store.dispatch(new UserCreate({ user: creatObj }));
      }
      this.store.pipe(select(selectUserUpdate)).subscribe(isLoading => {
        if (isLoading) {
          if (this.authorityLoadUser) {
            this.store.dispatch(new ListUserByAuthorityId({ authorityId: this.authorityLoadUser.authorityId }));
          }
          this.close();
        }
        this.store.pipe(select(selectError)).subscribe(err => {
          if (err && err.error) {
            this.isValidate = true;
            if (err.error.value && err.error.value.errorKey.endsWith('duplicateemail')) {
              (<FormControl>this.editForm.controls['email']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey.endsWith('duplicateusername')) {
              (<FormControl>this.editForm.controls['userName']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey.endsWith('duplicatephonenumber')) {
              (<FormControl>this.editForm.controls['phoneNumber']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey === 'error.maxuser') {
              this.close();
            }
          }

        });
      });

    } else {
      this.isValidate = true;
    }
  }

  // lưu và tiếp tục
  SaveAndSave() {

    this.users.fullName = this.users.fullName.replace(/\s+/g, ' ');
    this.users.fullName = this.users.fullName.trim();

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
      this.store.pipe(select(selectUserUpdate)).subscribe(isLoading => {
        if (isLoading) {
          if (this.authorityLoadUser) {
            this.store.dispatch(new ListUserByAuthorityId({ authorityId: this.authorityLoadUser.authorityId }));
          }
          this.clean();
        }
        this.store.pipe(select(selectError)).subscribe(err => {
          if (err && err.error) {
            this.isValidate = true;
            if (err.error.value && err.error.value.errorKey.endsWith('duplicateemail')) {
              (<FormControl>this.editForm.controls['email']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey.endsWith('duplicateusername')) {
              (<FormControl>this.editForm.controls['userName']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey.endsWith('duplicatephonenumber')) {
              (<FormControl>this.editForm.controls['phoneNumber']).setErrors({ notUnique: true });
              this.isValidate = true;
            }
          }

          if (err && err.error) {
            if (err.error.value && err.error.value.errorKey === 'error.maxuser') {
              this.close();
            }
          }

        });
      });

    } else {
      this.isValidate = true;
    }
  }
  

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

  close() {
    this.activeModal.dismiss('cancel');
  }

  openClose() {
    console.log(JSON.stringify(this.users));
    console.log(JSON.stringify(this.userTemp));
    if (JSON.stringify(this.users) === JSON.stringify(this.userTemp)) {
      this.close();
    } else {
      this.modalDefault.show();
    }
  }

  // load authority
  loadAuthority() {
    this.store.dispatch(new LoadAuthorities({ textSearch: '', currPage: 0, Record: 15 }));
  }

  // Load Category Department
  loadCategoryDepartment() {
    this.store.dispatch(new LoadCategoryDepartments({
      pagination: {

      }
    }));
  }

  // Load Category Position
  loadCategoryPosition() {
    this.store.dispatch(new LoadCategoryPositions({
      pagination: {

      }
    }));
  }



  checkRole(e, role) {

    this.arrRole.push({
      AuthorityId: Number(e.target.value),
      RoleName: role.authorityName
    });
    console.log(' this.arrRole', this.arrRole);
  }

}
