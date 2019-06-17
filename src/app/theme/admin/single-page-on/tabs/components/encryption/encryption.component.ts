import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { EL_NAVBAR_QUERY_SELECTOR, EL_TAB_QUERY_SELECTOR } from 'src/app/app.constant';
import { selectMenu } from 'src/app/core/auth/auth.selectors';
import { AppState } from 'src/app/core/core.state';
import { toTimeFormat } from 'src/app/shared/util/common.util';
import { AdminState } from 'src/app/theme/admin/admin.state';
import {
    selectEncryptionFields,
    selectEncryptionFieldsSuccess,
    selectEncryptionFielModuleSuccess, selectEncryptionModuleSuccess, selectEncryptionUpdateSuccess
} from '../../selectors/encryption.selectors';
import {
    LoadFieldByModuledEncryptions,
    LoadFieldEncryptions,
    LoadModuledEncryptions,
    UpdateEncryption
} from '../../actions/encryption.actions';
import {ModalConfirmComponent} from '../../../../../../shared/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.scss']
})
export class EncryptionComponent implements OnInit, OnDestroy {

  rows = [];
  remainTime;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  timeEncryption: any;
  menu: any;
  field: any;
  encryptionModule?: any;
    organizationCode: any;
  listField: any;
  isEncryption = [];
    @ViewChild('modalDefault') modalDefault;
    contentEncryption: string;
    @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<AdminState>,
    private appStore$: Store<AppState>,
  ) {
    this.fetchFullScreenData((data) => {
    });
  }

  ngOnInit() {
    this.listField = [];
    this.appStore$.dispatch(new LoadFieldEncryptions({orgCode : this.organizationCode}));
    this.appStore$.pipe(select(selectEncryptionFieldsSuccess)).subscribe(data => {
        if (data) {
            this.rows = data.attributesEncryption;
            this.timeEncryption = data.schedulerTime;
            const hours = Number(moment(data.schedulerTime).format('HH'));
            const minutes = Number(moment(data.schedulerTime).format('mm'));
            const seconds = Number(moment(data.schedulerTime).format('ss'));
            this.remainTime =  moment().add(1, 'days').hours(hours).minutes(minutes).seconds(seconds);
            console.log(this.timeEncryption);
        }
    });
    this.encryptionModule = null;
    this.appStore$.dispatch(new LoadModuledEncryptions());
    this.appStore$.pipe(select(selectEncryptionModuleSuccess)).subscribe(data => {
        this.menu = data;
    });

    this.appStore$.pipe(select(selectEncryptionFielModuleSuccess)).subscribe(data => {
      this.field =  data;
    });
    setTimeout(() => {
      document.querySelectorAll('.table-encryption').forEach(tbl => {
        const navbar = <HTMLElement>document.querySelector(EL_NAVBAR_QUERY_SELECTOR);
        const topbar = <HTMLElement>document.querySelector(EL_TAB_QUERY_SELECTOR);
        const maxHeight = `${window.outerHeight - navbar.offsetTop - topbar.offsetTop - 339}px`;
        (<HTMLElement>tbl).style.maxHeight = maxHeight;
        (<HTMLElement>tbl).style.height = maxHeight;
        (<HTMLElement>tbl).style.overflowY = 'auto';
      });
      document.querySelectorAll('.table-module-encryption').forEach(tbl => {
        const navbar = <HTMLElement>document.querySelector(EL_NAVBAR_QUERY_SELECTOR);
        const topbar = <HTMLElement>document.querySelector(EL_TAB_QUERY_SELECTOR);
        const maxHeight = `${window.outerHeight - navbar.offsetTop - topbar.offsetTop - 422}px`;
        (<HTMLElement>tbl).style.maxHeight = maxHeight;
        (<HTMLElement>tbl).style.height = maxHeight;
        (<HTMLElement>tbl).style.overflowY = 'auto';
      });
    }, 0);
  }

  onModuleChange($event) {
    this.listField = [];
    this.encryptionModule = $event;
      this.appStore$.dispatch(new LoadFieldByModuledEncryptions({parentCode:  $event, orgCode: this.organizationCode}));
    // this.field$ = this.store.select(selectEncryptionFields, { module: this.encryptionModule });
  }

  onFieldEncryptionChange($event, item) {
    if ($event) {
      const fields = {
          'AttributeCode' : item.attributeCode,
          'ParentCode': this.encryptionModule,
          'ModuleName': item.moduleName,
          'AttributeLabel': item.attributeLabel
      };
      this.listField.push(fields);
    } else {
        const found = this.listField.find(x => x.AttributeCode === item.attributeCode);
        if (found) {
            const index = this.listField.indexOf(found);
            this.listField.splice(index, 1);
        }
    }
  }

  fetchFullScreenData(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/fullscreen.json');

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  showEncryptTime = () => Observable.interval(1000).startWith(0).switchMap(() => {
    const diffTime = moment.duration(this.remainTime.diff(moment()));
    return toTimeFormat(diffTime, true);
  });

  showEncryptRemaining = () => Observable.interval(1000).startWith(0).switchMap(() => {
    const diffTime = moment.duration(this.remainTime.diff(moment()));
    return toTimeFormat(diffTime);
  });

  close() {
    this.activeModal.dismiss();
  }

  save() {
    // if (this.listField) {
      const encrytionsSave = {
        'Attributes' : this.listField,
          'OrgCode' : this.organizationCode
      };
      this.appStore$.dispatch(new UpdateEncryption(encrytionsSave));
      this.appStore$.pipe(select(selectEncryptionUpdateSuccess)).subscribe(res => {
        if (res) {
          this.listField = [];
            this.isEncryption = [];
        }
      });
    // }
  }

    // onChangea($event) {
    //   console.log('VAO DAY', $event);
    //   $event.preventDefault();
    // }

  ngOnDestroy() {
    this.showEncryptTime = undefined;
    this.showEncryptRemaining = undefined;
  }
    openConfirm(row) {
        this.modalConfirm.showReference(row);
    if (row) {
      this.contentEncryption = 'Hủy mã hóa trường dữ liệu';
    } else {
      this.contentEncryption = 'Mã hóa trường dữ liệu';
    }
    }
    agreeComfirmEncryp(item) {
    console.log('agreeComfirm', this.isEncryption, item);
        const encrytionsSave = {
            'Attributes' :  [{
                'AttributeCode' : item.attributeCode,
                'ParentCode': item.menuCode,
                'ModuleName': item.moduleName,
                'AttributeLabel': item.attributeLabel
            }],
            'OrgCode' : this.organizationCode
        };
        this.appStore$.dispatch(new UpdateEncryption(encrytionsSave));
    }
}
