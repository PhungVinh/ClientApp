import {Component, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectAccount, selectIsAuthenticated} from "../../../../../../core/auth/auth.selectors";
import {Observable} from "rxjs/Rx";
import {AppState} from "../../../../../../core/core.state";
import {IUser, User} from "../../../../../../shared/model/user.model";
import {animate, style, transition, trigger} from '@angular/animations';
import {ProfilesUpdate, UploadFileProfiles} from "../../actions/profile.actions";
import {NgbDate, NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {getAllRole, getAuthorityInfo} from "../../selectors/authority.selectors";
import {Authority} from "../../../../../../shared/model/authority.model";
import {AuthorityInfo, LoadAllRole} from "../../actions/authority.actions";
import * as moment from 'moment';
import {GetLinkImage, OrganizationsCreate, OrganizationsUpdate} from '../../actions/organization.actions';
import {selectGetLinkImage, selectOrganizationInforFaild, selectOrganizationUpdate} from '../../selectors/organization.selectors';
import {emailMask} from 'text-mask-addons/dist/textMaskAddons';
import {ActionFetchAccount} from '../../../../../../core/auth/auth.actions';
import {FormControl} from '@angular/forms';
import {selectProfileUpdateFaild, selectProfileUpdateSuccess} from '../../selectors/profie.selectors';
import { environment } from '@env/environment';
import {AUTH_TOKEN} from '../../../../../../core/auth/auth.constants';
import {LocalStorageService} from '../../../../../../core/local-storage/local-storage.service';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../organization/organization.component.scss'],
    animations: [
        trigger('fadeInOutTranslate', [
            transition(':enter', [
                style({opacity: 0}),
                animate('400ms ease-in-out', style({opacity: 1}))
            ]),
            transition(':leave', [
                style({transform: 'translate(0)'}),
                animate('400ms ease-in-out', style({opacity: 0}))
            ])
        ])
    ]
})

export class ProfileComponent implements OnInit {
    account$: Observable<IUser>;
    avatar = '';
    public emailMask = emailMask;
    public patternEmail = /^[a-zA-Z\d][\w._]*@\w+(\.[a-zA-Z\d]+)(\.[a-zA-Z]+)?$/;
    fileToUpload: File = null;
    checkTypeFile = false;
    typefiles = ['jpg', 'png', 'gif', 'jpeg'];
    account: any;
    accountTemp: any;
    authorities: any[];
    birthdayTemp;
    // isDisableSave;
    auth;
   authorityTemp: any[];
   authAllTemp: any[];
    public maskUsMobiles = /^\+?\d{10,12}$/;
    time;
    @ViewChild('editForm') editForm;
    today: NgbDateStruct;
    resourceAPI = `${environment.serverResource}/Account/`;
    isRole;

  constructor(
      public store: Store<AppState>,
      public parserFormatter: NgbDateParserFormatter,
      private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit() {
      const authToken = this.localStorage.getItem(AUTH_TOKEN);
      const decodedToken = jwtDecode(authToken);
     this.isRole = decodedToken.Role;
     const date = moment();
      date.subtract(1, 'days');
      const months = Number(moment(date).format('M'));
      const days = Number(moment(date).format('D'));
      const years = Number(moment(date).format('YYYY'));
      this.today = {year: years, month: months, day: days};
     //  const date = new Date();
     //  this.today = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate().subtract(1, 'days')};
     //  console.log(this.today);
      this.auth = null;
      this.store.dispatch(new ActionFetchAccount());
      this.store.pipe(select(selectAccount)).subscribe(data => {
          this.account =  Object.assign({}, data);
          if (this.account && this.account.avatar) {
              this.avatar = this.resourceAPI + this.account.avatar + '?rnd=' + Math.random();
                console.log('avatar', this.avatar);
              // location.reload(true);
              // this.store.dispatch(new GetLinkImage({fileName: this.account.avatar}));
              // this.store.pipe(select(seleccavartGetLinkImage)).subscribe(res => {
              //     console.log('link anh', res);
              //     if (res) {
              //         this.avatar = 'data:image/jpg;base64,' + res.data;
              //         console.log(this.avatar);
              //     }
              // });
          }
          if (this.account.birthDay) {
            this.account.birthDay = moment(this.account.birthDay);
          }
          this.accountTemp = Object.assign({}, this.account);
      });
      this.store.dispatch(new AuthorityInfo());
      this.store.pipe(select(getAuthorityInfo)).subscribe(data => {
          if (data) {
              this.authorities = Object.assign([], data.allRoles);
              this.authorityTemp = Object.assign([], data.roleModule);
              this.authAllTemp = Object.assign([], data.allRoles);
          }
      });
  }

  // imageLink = (path) => {
  //       return this.resourceAPI + (path ? path.replace('\\\\', '/') : '');
  // }

    handleFileSelectProfile(evt) {
        const files = evt.target.files;
        const file = files[0];
        const filename = file.name;
        const index = filename.lastIndexOf('.') + 1;
        const extension = filename.substr(index);
        const FileSize = file.size / 1024 / 1024;
        if (this.typefiles.indexOf(extension.toLowerCase()) === -1 || FileSize > 5) {
            this.checkTypeFile = true;
            // this.checkSizeFile = false;
        } else {
            this.avatar = '';
            this.checkTypeFile = false;
            // this.checkSizeFile = false;
            const frmData = new FormData();
            frmData.append('files', files[0]);
            this.store.dispatch(new UploadFileProfiles({file: frmData}));
            if (files && file) {
                const reader = new FileReader();

                reader.onload = this._handleReaderLoaded.bind(this);

                reader.readAsBinaryString(file);
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
            this.avatar = 'data:image/jpg;base64,' + btoa(binaryString);
    }
    save() {
        // this.isDisableSave = true;
        console.log('test', this.editForm.valid, this.account);
        if (this.editForm.valid) {
            const saveAccount = Object.assign({}, this.account);
            if (saveAccount.birthDay) {
                saveAccount.birthDay = saveAccount.birthDay.format('YYYY-MM-DD');
            }
            this.store.dispatch(new ProfilesUpdate({account: saveAccount}));
            this.store.pipe(select(selectProfileUpdateSuccess)).subscribe(load => {
                // this.isDisableSave = false;
            });
            this.store.pipe(select(selectProfileUpdateFaild)).subscribe( err => {
                // this.isDisableSave = false;
                if (err && err.error) {
                    if (err.error.value.message && err.error.value.message.endsWith('Email đã tồn tại') && this.editForm.controls['email']) {
                        this.editForm.controls['email'].setErrors({notUnique: true});
                    } else  if (err.error.value.message && err.error.value.message.endsWith('PhoneNumber đã tồn tại') && this.editForm.controls['phoneNumbers']) {
                        this.editForm.controls['phoneNumbers'].setErrors({notUnique: true});
                    }
                }
            });
        }
    }
    clear() {
      this.account = Object.assign({}, this.accountTemp);
    }

    onFilterAuth(item) {
      if (item == null) {
          this.authorities = Object.assign([], this.authAllTemp);
      } else {
          const dataAuth = this.authorityTemp.filter(data => data.parentCode === item);
          this.authorities  = dataAuth[0].roles;
      }
    }

    formatDate(date: NgbDateStruct) {
        return date ?
            `${this.isNumber(date.day) ? this.padNumber(date.day) : ''}/${this.isNumber(date.month) ? this.padNumber(date.month) : ''}/${date.year}` :
            '';
    }

    toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }

    isNumber(value: any): value is number {
        return !isNaN(this.toInteger(value));
    }

    padNumber(value: number) {
        if (this.isNumber(value)) {
            return `0${value}`.slice(-2);
        } else {
            return '';
        }
    }
}

