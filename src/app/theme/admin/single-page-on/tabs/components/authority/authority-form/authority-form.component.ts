import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store, select, ActionsSubject } from '@ngrx/store';
import {
  AddAuthority,
  CopyAuthority,
  UpdateAuthority,
  LoadAllRole,
  LoadAllAuthority,
  AuthorityActionTypes,
  LoadAuthorities
} from '../../../actions/authority.actions';
import { Authority } from 'src/app/shared/model/authority.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getLoading, getAllAuthority, getAllRole, getErrorAuthority } from '../../../selectors/authority.selectors';
import { Observable, Subject } from 'rxjs';
import { Role } from 'src/app/shared/model/role.model';
import { distinctUntilChanged, take, filter } from 'rxjs/operators';
import { selectModule } from '../../../selectors/module.selector';
import { AuthorityService } from '../../../services/authority/authority.service';
import * as _ from 'lodash';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { takeUntil } from 'rxjs/operators';
import { PER_PAGE } from 'src/app/shared/constants/authority.constants';



@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.scss']
})
export class AuthorityAddComponent implements OnInit, OnDestroy {

  authorityForm: FormGroup = null;
  selectModule: FormControl;
  /**
   * loading chứ không phải loadding nhé
   * @author daibh
   */
  public roles: any;
  public oldRole: Role[];
  public selectedAutho = "default";
  public selectedShowAll = false;
  public selectedEditAll = false;
  public selectedDeleteAll = false;
  public selectedShow = false;
  public selectedAdd = false;
  public selectedDelete = false;
  public selectedEdit = false;
  public selectedEncypt = false;
  public selectedAllCheckbox = false;
  public allAuthority: Authority[];
  public allAuthority$: Observable<Authority[]>
  public authorities: Authority[]
  private roles$: Observable<Role[]>
  private loading$: Observable<Boolean>;
  public listModule$: Observable<any[]>;
  private tblAuthority: Authority;
  public title: String;
  public oldForm: any;
  readonly errorMsgs = {
    authorityName: ''
  };
  public formSubmitAttempt: boolean;
  subscription: Subject<void> = new Subject();
  compSubscription: Subject<void> = new Subject();
  @Input() authority: Authority;

  isContinue = false;
  trackAction: AuthorityActionTypes[] = [
    AuthorityActionTypes.AddAuthoritySuccess,
    AuthorityActionTypes.UpdateAuthoritySuccess,
    AuthorityActionTypes.AddAuthorityFail,
    AuthorityActionTypes.LoadAuthoritySuccess,
    AuthorityActionTypes.LoadAllAuthorityFail
  ];

  @ViewChild('modalDefault') modalDefault: ModalConfirmComponent;
  @ViewChild('authorityNameInput') authorityNameInput: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<any>,
    public activeModal: NgbActiveModal,
    public authorityService: AuthorityService,
    private actionsSubject$: ActionsSubject
  ) {
    // track for save action status
    this.actionsSubject$.pipe(
      takeUntil(this.compSubscription), // only hold on subscrible when subscription alive
      filter((action) => this.trackAction.some(a => a === action.type))
    ).subscribe((action) => {
      switch (action.type) {
        case AuthorityActionTypes.AddAuthoritySuccess:
        case AuthorityActionTypes.UpdateAuthoritySuccess:
          this.store.dispatch(new LoadAuthorities({ textSearch: '', currPage: 1, recordperpage: PER_PAGE }));
          break;
        case AuthorityActionTypes.LoadAuthoritySuccess:
          if (this.isContinue) {
            this.authorityForm.reset();
            this.selectedAutho = 'default';
            this.roles = this.roles.map((role) => {
              return {
                ...role,
                isAdd: false,
                isDelete: false,
                isDeleteAll: false,
                isEdit: false,
                isEditAll: false,
                isEncypt: role.isEncypt === null ? role.isEncypt : false,
                isShow: false,
                isShowAll: false
              };
            });
            this.selectedShowAll = false;
            this.selectedEditAll = false;
            this.selectedDeleteAll = false;
            this.selectedEncypt = false;
            this.selectedShow = false;
            this.selectedAdd = false;
            this.selectedDelete = false;
            this.selectedEdit = false;
            this.selectedAllCheckbox = false;
            this.authorityForm.patchValue({
              authorityName: '',
              isLock: false,
              authorityDescription: ''
            });
            this.store.dispatch(new LoadAllAuthority({ textSearch: '', currPage: 0, recordperpage: 10 }));
            // this.validateDuplicateName();
          } else {
            this.clear();
          }
          break;
        case AuthorityActionTypes.LoadAllAuthorityFail:
          this.clear();
          break;
      }
    });
  }

  ngOnInit() {
    if (this.authority) {
      this.title = "Sửa nhóm quyền";
      this.authorityForm = this._formBuilder.group({
        authorityName: [this.authority.authorityName, [Validators.required]],
        isLock: [this.authority.isLock],
        authorityDescription: [this.authority.authorityDescription]
      });
      this.oldForm = this.authorityForm.value;
      this.selectModule = new FormControl('');
    } else {
      this.title = "Thêm mới nhóm quyền";
      this.authorityForm = this._formBuilder.group({
        authorityName: ['', [Validators.required]],
        isLock: [false],
        authorityDescription: ['']
      });
      this.oldForm = this.authorityForm.value;
      this.selectModule = new FormControl('');
    }
    this.loading$ = this.store.pipe(select(getLoading));
    this.allAuthority$ = this.store.pipe(select(getAllAuthority));
    this.allAuthority$.subscribe(allAuthority => {
      if (allAuthority && this.authority) {
        this.allAuthority = allAuthority.filter(authority => authority.authorityId !== this.authority.authorityId);
      } else {
        this.allAuthority = allAuthority
      }
    });
    this.roles$ = this.store.pipe(select(getAllRole));
    this.roles$.subscribe(roles => {
      this.oldRole = roles.map(role => ({ ...role }));
      this.roles = roles.map(role => ({ ...role, selected: false }));
      this.roles.forEach(element => {
        this.checkIfAllFunctionSelected(element.index);
      });
    })
    this.listModule$ = this.store.pipe(select(selectModule));

    // edited by daibh
    // this.selectModuleChange();
    this.selectModule.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.listRole(value);
    });


    // this.validateForm();
    // end edited

    this.authorityName.valueChanges.subscribe((value) => {
      this.validateForm();
    });

    // Injected by daibh
    this.store.select(getErrorAuthority).subscribe((errors) => {
      if (errors) {
        if (errors.value && errors.value.errorKey.endsWith('error.duplicatename')) {
          this.authorityName.setErrors({ notUnique: true });
          if (this.authorityName.hasError('notUnique')) {
            this.errorMsgs.authorityName = "Thông tin đã tồn tại trên hệ thống";
            this.authorityNameInput.nativeElement.focus();
          } else {
            this.errorMsgs.authorityName = "";
          }
        }
      }

    });

  }

  validateForm() {
    if (this.authorityName.hasError('required')) {
      this.errorMsgs.authorityName = "Thông tin không được để trống";
      if (this.authorityName.touched) {
        this.authorityNameInput.nativeElement.focus();
      }
    } else if (this.authorityName.hasError('notUnique')) {
      this.errorMsgs.authorityName = "Thông tin đã tồn tại trên hệ thống";
      this.authorityNameInput.nativeElement.focus();
    } else {
      this.errorMsgs.authorityName = "";
    }
  }

  save() {
    const { authorityName, isLock, authorityDescription } = this.authorityForm.value;
    this.tblAuthority = {
      authorityName,
      isLock,
      authorityDescription
    };
    this.store.dispatch(new AddAuthority({ tblAuthority: this.tblAuthority, tblRoles: this.roles }));

    // commented by daibh
    // this.loading$.subscribe(loading => {
    //   if (loading === false) {
    //     this.clear();
    //   }
    // });
  }

  update() {
    const { authorityName, isLock, authorityDescription } = this.authorityForm.value;
    this.tblAuthority = {
      authorityId: this.authority.authorityId,
      authorityName,
      isLock,
      authorityDescription
    };
    this.store.dispatch(new UpdateAuthority({ tblAuthority: this.tblAuthority, tblRoles: this.roles }));

    // commented by daibh
    // this.loading$.subscribe(loading => {
    //   if (loading === false) {
    //     this.clear();
    //   }
    // });
  }

  saveAndContinute() {
    this.authorityName.markAsTouched();
    if (this.authorityForm.invalid) {
      this.validateForm();
    } else {
      const { authorityName, isLock, authorityDescription } = this.authorityForm.value;
      this.tblAuthority = {
        authorityName,
        isLock,
        authorityDescription
      };
      this.isContinue = true;
      this.store.dispatch(new AddAuthority({ tblAuthority: this.tblAuthority, tblRoles: this.roles }));
      // this.loading$.pipe(takeUntil(this.subscription)).subscribe(loading => {
      //   if (loading === false) {
      //     this.authorityForm.reset();
      //     this.selectedAutho = 'default';
      //     this.roles = this.roles.map((role) => {
      //       return {
      //         ...role,
      //         isAdd: false,
      //         isDelete: false,
      //         isDeleteAll: false,
      //         isEdit: false,
      //         isEditAll: false,
      //         isEncypt: role.isEncypt === null ? role.isEncypt : false,
      //         isShow: false,
      //         isShowAll: false
      //       };
      //     });
      //     this.selectedShowAll = false;
      //     this.selectedEditAll = false;
      //     this.selectedDeleteAll = false;
      //     this.selectedEncypt = false;
      //     this.selectedShow = false;
      //     this.selectedAdd = false;
      //     this.selectedDelete = false;
      //     this.selectedEdit = false;
      //     this.selectedAllCheckbox = false;
      //     this.authorityForm.patchValue({
      //       authorityName: '',
      //       isLock: false,
      //       authorityDescription: ''
      //     });
      //     console.log('11111');
      //     // this.store.dispatch(new LoadAllAuthority({ textSearch: '', currPage: 0, Record: 10 }));
      //   }
      // });
      // this.store.dispatch(new LoadAllAuthority({ textSearch: '', currPage: 0, Record: 10 }));
      // this.validateDuplicateName();

    }
  }

  submit() {
    this.authorityName.markAsTouched();
    if (this.authorityForm.invalid) {
      this.validateForm();
    } else {
      if (this.authority) {
        this.update();
      } else {
        this.save();
      }

      // commented by daibh
      // this.validateDuplicateName();
    }
  }

  // commented by daibh
  // validateDuplicateName() {
  //   this.store.select(getErrorAuthority).subscribe((errors) => {
  //     if (errors) {
  //       if (errors.value && errors.value.errorKey.endsWith('error.duplicatename')) {
  //         this.authorityName.setErrors({ notUnique: true });
  //         if (this.authorityName.hasError('notUnique')) {
  //           this.errorMsgs.authorityName = "Thông tin đã tồn tại trên hệ thống";
  //           this.authorityNameInput.nativeElement.focus();
  //         } else {
  //           this.errorMsgs.authorityName = "";
  //         }
  //       }
  //     }

  //   });
  // }

  openClose() {
    const newRoles = this.roles.map(role => {
      const { authorityId, index, isAdd, isApprove, isDelete, isDeleteAll, isEdit, isEditAll, isEnable, isEncypt, isExport,
        isFirstExtend,
        isFouthExtend,
        isImport,
        isPermission,
        isPrint,
        isSecondExtend,
        isShow,
        isShowAll,
        isThirdExtend,
        menuCode,
        menuName,
        parentCode
      } = role;
      return {
        authorityId, index, isAdd, isApprove, isDelete, isDeleteAll, isEdit, isEditAll, isEnable, isEncypt, isExport,
        isFirstExtend,
        isFouthExtend,
        isImport,
        isPermission,
        isPrint,
        isSecondExtend,
        isShow,
        isShowAll,
        isThirdExtend,
        menuCode,
        menuName,
        parentCode
      };
    });
    const compare = _.isEqual(newRoles, this.oldRole);
    const compareForm = _.isEqual(this.oldForm, this.authorityForm.value);
    if ((this.authorityForm.pristine && compare) || (compareForm && compare)) {
      this.clear();
    } else {
      this.modalDefault.showReference();
    }
  }

  agreeComfirm($event) {
    this.modalDefault.hide();
    this.clear();
  }
  clear() {
    this.authorityForm.reset();
    this.activeModal.dismiss('cancel');
  }

  onCheckAllFunction(e, index) {
    this.roles = this.roles.map(role => {
      const { selected } = role;
      if (role.index === index) {
        return {
          ...role,
          isAdd: selected,
          isDelete: selected,
          isDeleteAll: selected,
          isEdit: selected,
          isEditAll: selected,
          isShow: selected,
          isShowAll: selected,
          isEncypt: role.isEncypt === null ? role.isEncypt : selected
        };
      } else {
        return role;
      }
    });
    this.selectedAllCheckbox = this.roles.every(item => item.selected === true);
    this.selectedShowAll = this.selectedAllCheckbox;
    this.selectedEditAll = this.selectedAllCheckbox;
    this.selectedDeleteAll = this.selectedAllCheckbox;
    this.selectedEncypt = this.selectedAllCheckbox;
    this.selectedShow = this.selectedAllCheckbox;
    this.selectedAdd = this.selectedAllCheckbox;
    this.selectedDelete = this.selectedAllCheckbox;
    this.selectedEdit = this.selectedAllCheckbox;
  }
  checkIfAllFunctionSelected(index) {
    this.roles = this.roles.map(role => {
      if (role.index === index) {
        const { isAdd, isDelete, isDeleteAll, isEdit, isEditAll, isShow, isShowAll, isEncypt } = role;
        const arrCheck = [isAdd, isDelete, isDeleteAll, isEdit, isEditAll, isShow, isShowAll, isEncypt];
        const selectedAll = arrCheck.every(item => item === true);
        return { ...role, isDelete: isDeleteAll || isDelete, isShow: isShowAll || isShow, isEdit: isEditAll || isEdit, selected: selectedAll }
      } else {
        return role;
      }
    });
    this.selectedShowAll = this.roles.every((item) => item.isShowAll);
    this.selectedEditAll = this.roles.every((item) => item.isEditAll);
    this.selectedDeleteAll = this.roles.every(item => item.isDeleteAll);
    this.selectedShow = this.roles.every(item => item.isShow);
    this.selectedAdd = this.roles.every(item => item.isAdd);
    this.selectedDelete = this.roles.every(item => item.isDelete);
    this.selectedEdit = this.roles.every(item => item.isEdit);
    this.selectedEncypt = this.roles.every(item => item.isEncypt);
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
  }

  onCheckDelete() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.roles = this.roles.map(role => ({ ...role, isDelete: this.selectedDelete }));
  }

  onCheckEdit() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.roles = this.roles.map(role => ({ ...role, isEdit: this.selectedEdit }));
  }

  onCheckAdd() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.roles = this.roles.map(role => ({ ...role, isAdd: this.selectedAdd }));
  }

  onCheckShow() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.roles = this.roles.map(role => ({ ...role, isShow: this.selectedShow }));
  }

  onCheckDeleteAll() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.selectedDelete = this.selectedDeleteAll || this.selectedDelete;
    this.roles = this.roles.map(role => ({ ...role, isDeleteAll: this.selectedDeleteAll, isDelete: this.selectedDeleteAll || role.isDeleteAll }));
  }

  onCheckEditAll() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.selectedEdit = this.selectedEditAll || this.selectedEdit;
    this.roles = this.roles.map(role => ({ ...role, isEditAll: this.selectedEditAll, isEdit: this.selectedEditAll || role.isEditAll }));
  }

  onCheckShowAll() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.selectedShow = this.selectedShowAll || this.selectedShow;
    this.roles = this.roles.map(role => ({ ...role, isShowAll: this.selectedShowAll, isShow: this.selectedShowAll || role.isShow }));
  }
  onCheckEncypt() {
    this.selectedAllCheckbox = this.selectedShowAll && this.selectedEditAll && this.selectedDeleteAll &&
      this.selectedShow && this.selectedAdd && this.selectedDelete && this.selectedEdit && this.selectedEncypt;
    this.roles = this.roles.map(role => ({ ...role, isEncypt: role.isEncypt === null ? role.isEncypt : this.selectedEncypt }));
  }

  onCheckAllCheckbox() {
    this.selectedShowAll = this.selectedAllCheckbox;
    this.selectedEditAll = this.selectedAllCheckbox;
    this.selectedDeleteAll = this.selectedAllCheckbox;
    this.selectedEncypt = this.selectedAllCheckbox;
    this.selectedShow = this.selectedAllCheckbox;
    this.selectedAdd = this.selectedAllCheckbox;
    this.selectedDelete = this.selectedAllCheckbox;
    this.selectedEdit = this.selectedAllCheckbox;

    this.roles = this.roles.map(role => {
      return {
        ...role,
        isAdd: this.selectedAllCheckbox,
        isDelete: this.selectedAllCheckbox,
        isDeleteAll: this.selectedAllCheckbox,
        isEdit: this.selectedAllCheckbox,
        isEditAll: this.selectedAllCheckbox,
        isShow: this.selectedAllCheckbox,
        isShowAll: this.selectedAllCheckbox,
        isEncypt: role.isEncypt === null ? role.isEncypt : this.selectedAllCheckbox,
        selected: this.selectedAllCheckbox
      }
    });
  }

  copyAuthority(id) {
    console.log('id', id);
    if (id !== 'default') {
      this.store.dispatch(new CopyAuthority({ id: id, parentCode: this.selectModule.value }))
    } else {
      this.store.dispatch(new LoadAllRole({ ParentCode: '' }));
    }
  }

  // commented by daibh
  // selectModuleChange() {
  //   this.selectModule.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
  //     this.listRole(value);
  //   })
  // }

  listRole(value = '') {
    if (value) {
      return this.roles.filter(role => role.parentCode === value);
    }
    return this.roles;
  }

  get authorityName() {
    return this.authorityForm.get('authorityName');
  }

  get isLock() {
    return this.authorityForm.get('isLock');
  }

  get authorityDescription() {
    return this.authorityForm.get('authorityDescription');
  }

  get selectAuthority() {
    return this.authorityForm.get('selectAuthority');
  }

  ngOnDestroy() {
    this.compSubscription.next();
    this.compSubscription.complete();
  }
}
