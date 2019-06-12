import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgbActiveModal, NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { after, before, equals } from 'src/app/shared/util/datepicker.util';
import { emailMask } from 'text-mask-addons/dist/textMaskAddons';
import {Organization} from '../../../../../../shared/model/organization.model';
import { isDefined, isNumber, padNumber } from '../../../../../../shared/util/common.util';
import {State} from '../../../../admin.state';
import { LoadAllCategory, OrganizationsCreate, OrganizationsServicePack, OrganizationsUpdate } from '../../actions/organization.actions';
import { selectCategoryAll, selectOrganizationUpdate, selectOrganizationUpdateFaild, selectServicePack } from '../../selectors/organization.selectors';
import {environment} from '@env/environment';

@Component({
    selector: 'app-organization-update',
    templateUrl: './organization-update.component.html',
    styleUrls: ['organization.component.scss']
})
export class OrganizationUpdateComponent implements OnInit {
    organizations: Organization;
    public maskUsMobile = /^\+?\d{10,12}$/;
    public patternEmail = /^[a-zA-Z\d][\w._]*@\w+(\.[a-zA-Z\d]+)(\.[a-zA-Z]+)?$/;
    public emailMask = emailMask;
    hoveredDate: NgbDateStruct;
    @ViewChild('modalDefault') modalDefault;
    @ViewChild('editForm') editForm;
    fromDate: any;
    toDate: any;
    fromDateTemp: any;
    toDateTemp: any;
    isCollapsed = false;
    isValidate = false;
    checkTypeFile = false;
    typefiles = ['jpg', 'png', 'gif', 'jpeg'];
    organizationsTemp: Organization;
    today: NgbDateStruct;
    minDates: NgbDateStruct;
    categories: any;
    isValidateDate = false;
    servicePacks: any;
    logoOrg: any;
    @ViewChild('code') codeField: ElementRef;
    @ViewChild('email') emailField: ElementRef;
    @ViewChild('taxCode') taxCodeField: ElementRef;
    resourceAPI = `${environment.serverResource}/Organization/`;

    constructor(
        public activeModal: NgbActiveModal,
        private store: Store<State>,
        public parserFormatter: NgbDateParserFormatter,
        public calendar: NgbCalendar,
    ) { }

    ngOnInit() {
        const date = new Date();
        this.today = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
        this.store.dispatch(new LoadAllCategory());
        this.store.pipe(select(selectCategoryAll)).subscribe(data => {
            this.categories = data;
        });
        
        this.store.pipe(select(selectServicePack)).subscribe(data => {
            this.servicePacks = [];
            if (data && data.data && data.data instanceof Array) {
                (<[]>data.data).forEach(el => this.servicePacks.push(Object.assign({}, el)));
            }
        });
        if (this.organizations.organizationID === undefined) {
            const org = {
                'isActive': true,
                'organizationAddress': '',
                'organizationCode': '',
                'organizationEmail': '',
                'organizationFrom': '',
                'organizationHomePage': '',
                'organizationName': '',
                'organizationNote': '',
                'organizationParentCode': '',
                'organizationPhone': '',
                'organizationRemark': null,
                'organizationTaxCode': '',
                'organizationTo': '',
            };
            this.organizations = org;
            this.store.dispatch(new OrganizationsServicePack({OrganizationId: 0}));
        } else {
            this.organizations.organizationLogo = this.resourceAPI + this.organizations.organizationLogo;
            // console.log('organizations', this.organizations,organizations.organizationLogo );
            console.log('date', new Date(),  Number(moment(this.organizations.organizationFrom)));
            const months = Number(moment(this.organizations.organizationFrom).format('M'));
            const days = Number(moment(this.organizations.organizationFrom).format('D'));
            const years = Number(moment(this.organizations.organizationFrom).format('YYYY'));
            const dateTemp = {year: years, month: months, day: days};
            // this.equals(date, this.fromDate);
           if (before(dateTemp, this.today)) {
               this.minDates = dateTemp;
           } else {
               this.minDates = this.today;
           }
            this.fromDateTemp = this.organizations.organizationFrom;
            this.toDateTemp = this.organizations.organizationTo;
            this.organizations.organizationFrom = this.organizations.organizationFrom ? moment(this.organizations.organizationFrom).format('DD/MM/YYYY') : null;
            this.organizations.organizationTo = this.organizations.organizationTo ? moment(this.organizations.organizationTo).format('DD/MM/YYYY') : null;
            this.store.dispatch(new OrganizationsServicePack({OrganizationId: this.organizations.organizationID}));
        }
        this.organizationsTemp = Object.assign({}, this.organizations);
    }

    isToday(date: NgbDateStruct) {
        if (!this.today) {
            return false;
        } else {
            return date.year === this.today.year && date.month === this.today.month && date.day === this.today.day;
        }
    }

    save() {
        this.organizationsTemp = {
            ...this.organizations,
            organizationTo: this.toDateTemp ? this.toDateTemp : '',
            organizationFrom: this.fromDateTemp ? this.fromDateTemp : '',
            organizationLogo: this.organizations.organizationLogo ? this.organizations.organizationLogo.replace('data:image/jpg;base64,', '') : null
        };
        console.log(this.editForm);
        if (this.editForm.valid && this.isCheckValidateService() === false) {
            const serviceTemp = this.servicePacks.filter(data => data.CheckPack === true);
            const orginizationSend = {
                Org: this.organizationsTemp,
                tblServicePack: serviceTemp
            };

            if (this.organizations.organizationID !== undefined) {
                this.store.dispatch(new OrganizationsUpdate({oranization: orginizationSend}));
            } else {
                this.store.dispatch(new OrganizationsCreate({oranization: orginizationSend}));
            }
            this.store.pipe(select(selectOrganizationUpdate)).subscribe(isLoading => {
                if (isLoading) {
                    this.clear();
                }
            });
            this.store.pipe(select(selectOrganizationUpdateFaild)).subscribe(err => {
                if (err && err.error) {
                    this.isValidate = true;
                    if (err.error.message && err.error.message.endsWith('Mã Đơn vị đã tồn tại!')) {
                        (<FormControl>this.editForm.controls['organizationCode']).setErrors({notUnique: true});
                        this.codeField.nativeElement.focus();
                    } else if (err.error.message && err.error.message.endsWith('Email vị đã tồn tại!')) {
                        (<FormControl>this.editForm.controls['organizationEmail']).setErrors({notUnique: true});
                        this.emailField.nativeElement.focus();
                    } else if (err.error.message && err.error.message.endsWith('Mã số thuế vị đã tồn tại!')) {
                        (<FormControl>this.editForm.controls['organizationTaxCode']).setErrors({notUnique: true});
                        this.taxCodeField.nativeElement.focus();
                    }
                }
            });
        } else {
            this.isValidate = true;
        }
    }

    clear() {
        this.activeModal.dismiss();
    }

    openClose() {
        if (JSON.stringify(this.organizations) === JSON.stringify(this.organizationsTemp)) {
            this.clear();
        } else {
            this.modalDefault.show();
        }
    }

    agreeComfirm($event) {
        this.modalDefault.hide();
        this.clear();
    }

    clearTimeRange() {
        this.isValidateDate = true;
        this.organizations.organizationTo = '';
        this.organizations.organizationFrom = '';
        this.fromDate = '';
        this.toDate = '';
        this.toDateTemp = '';
        this.fromDateTemp = '';
    }

    /**
     * on change date
     * @param date changed date
     */
    onDateChange(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            this.organizations.organizationFrom = this.formatDate(this.fromDate);
            this.fromDateTemp = date.year + '-' + date.month + '-' + date.day;
        } else if (this.fromDate && !this.toDate && after(date, this.fromDate) || equals(date, this.fromDate)) {
            this.isCollapsed = !this.isCollapsed;
            this.toDate = date;
            this.organizations.organizationTo = this.formatDate(this.toDate);
            this.toDateTemp = date.year + '-' + date.month + '-' + date.day;
        } else {
            this.toDate = null;
            this.fromDate = date;
            this.organizations.organizationFrom = this.formatDate(this.fromDate);
            this.organizations.organizationTo = null;
            this.fromDateTemp = date.year + '-' + date.month + '-' + date.day;
            this.toDateTemp = '';
        }
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);

    formatDate(date: NgbDate) {
        return date ? `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` : '';
    }

    changeService($event, index) {
        this.servicePacks[index].CheckPack = $event;
    }

    /**
     * check validate service
     * @returns valid
     */
    isCheckValidateService() {
        const index = this.servicePacks.find(data => data.CheckPack === true);
        if (!isDefined(index)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     * handle File Select
     * @param evt event
     */
    handleFileSelectOrg(evt) {
        const files = evt.target.files;
        const file = files[0];
        const filename = file.name;
        const index = filename.lastIndexOf('.') + 1;
        const extension = filename.substr(index);
        const FileSize = Math.round(file.size / 1024 / 1024);
        if (this.typefiles.indexOf(extension.toLowerCase()) === -1 || FileSize > 5) {
            this.checkTypeFile = true;
            // if (files && file) {
            //     const reader = new FileReader();
            //
            //     reader.onload = this._handleReaderLoaded.bind(this);
            //
            //     reader.readAsBinaryString(file);
            // }
        } else {
            this.organizations.organizationLogo = '';
            this.checkTypeFile = false;
            const frmData = new FormData();
            frmData.append('files', files[0]);
            if (files && file) {
                const reader = new FileReader();

                reader.onload = this._handleReaderLoaded.bind(this);

                reader.readAsBinaryString(file);
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        const binaryString = readerEvt.target.result;
        this.organizations.organizationLogo = 'data:image/jpg;base64,' + btoa(binaryString);
        console.log( ' this.organizations.organizationLogo', this.organizations.organizationLogo);
    }
}
