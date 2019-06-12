import {Component, OnInit, ViewChild} from '@angular/core';
import {AppState} from '../../../../../../core/core.state';
import {select, Store} from '@ngrx/store';
import {
    selectCategoryAll,
    selectGetLinkImage,
    selectInforOrganization,
    selectOrganizationInforFaild
} from '../../selectors/organization.selectors';
import {
    GetLinkImage,
    LoadAllCategory,
    LoadInforOrganizations, OrganizationsInforUpdate,
    OrganizationsUploadFile,
    UploadFileOrganizations
} from '../../actions/organization.actions';
import {ProfilesUpdate, UploadFileProfiles} from '../../actions/profile.actions';
import {emailMask} from 'text-mask-addons/dist/textMaskAddons';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-info-organization',
  templateUrl: './info-organization.component.html',
  styleUrls: ['./info-organization.component.scss']
})
export class InfoOrganizationComponent implements OnInit {
  inforOrg: any;
  inforOrgTemp: any;
  inforOrganization: any;
  categories: any;
  checkTypeFile = false;
    @ViewChild('modalDefault') modalDefault;
  typefiles = ['jpg', 'png', 'gif', 'jpeg'];
  @ViewChild('editForm') editForm;
  isValidate = false;
  logo;
    public patternEmail = /^[a-zA-Z\d][\w._]*@\w+(\.[a-zA-Z\d]+)(\.[a-zA-Z]+)?$/;
    public maskUsMobile = /^\+?\d{10,12}$/;
    public emailMask = emailMask;

  constructor(
      public store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadAllCategory());
    this.store.dispatch(new LoadInforOrganizations());
    this.store.pipe(select(selectCategoryAll)).subscribe(data => {
      this.categories = data;
    });
    this.store.pipe(select(selectInforOrganization)).subscribe(data => {
      this.inforOrg = Object.assign({}, data);
      this.inforOrganization = Object.assign({}, this.inforOrg.organization);
      if (this.inforOrganization.organizationRemark === null) {
          this.inforOrganization.organizationRemark = null;
      }
      this.inforOrgTemp = Object.assign({}, this.inforOrg.organization);
      if (this.inforOrg.organization && this.inforOrg.organization.organizationLogo) {
                  this.logo = 'data:image/jpg;base64,' + this.inforOrg.organization.organizationLogo;
                  console.log('logo', this.logo);
      }
    });
  }
    handleFileSelect(evt) {
      console.log('infor org', evt);
        const files = evt.target.files;
        const file = files[0];
        const filename = file.name;
        const index = filename.lastIndexOf('.') + 1;
        const extension = filename.substr(index);
        const FileSize = file.size / 1024 / 1024;
        if (this.typefiles.indexOf(extension.toLowerCase()) === -1 || FileSize > 5) {
            this.checkTypeFile = true;
            // this.logo = '';
            // if (files && file) {
            //     const reader = new FileReader();
            //
            //     reader.onload = this._handleReaderLoaded.bind(this);
            //
            //     reader.readAsBinaryString(file);
            // }
        } else {
           // this.logo = '';
            this.checkTypeFile = false;
            const frmData = new FormData();
            frmData.append('files', files[0]);
            this.store.dispatch(new UploadFileOrganizations({file: frmData}));
            if (files && file) {
                const reader = new FileReader();

                reader.onload = this._handleReaderLoaded.bind(this);

                reader.readAsBinaryString(file);
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.logo = 'data:image/jpg;base64,' + btoa(binaryString);
    }
    save() {
        if (this.editForm.valid) {
            this.store.dispatch(new OrganizationsInforUpdate(Object.assign({}, this.inforOrganization)));
            this.store.pipe(select(selectOrganizationInforFaild)).subscribe( err => {
                if (err && err.error) {
                    this.isValidate = true;
                    if (err.error.value.message && err.error.value.message.endsWith('DuplicateEmail') && this.editForm.controls['organizationEmail']) {
                        (<FormControl>this.editForm.controls['organizationEmail']).setErrors({notUnique: true});
                    } else if (err.error.value.message && err.error.value.message.endsWith('DuplicateTaxCode') && this.editForm.controls['organizationTaxCode']) {
                        (<FormControl>this.editForm.controls['organizationTaxCode']).setErrors({notUnique: true});
                    }
                }
            });
        } else {
            this.isValidate = true;
        }
    }
    clear() {
        if ( JSON.stringify(this.inforOrgTemp) !== JSON.stringify(this.inforOrganization)) {
            this.modalDefault.show();
        }
    }
    reset() {
        this.inforOrganization = Object.assign({}, this.inforOrgTemp);
    }
    agreeComfirm () {
        this.modalDefault.hide();
        this.reset();
    }

    formatServicePack(servicePack) {
        return (servicePack || []).map(x => x.nameServicePack).join(', ');
    }
}
