import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { IComponentRender } from 'src/app/shared/model/component.interface';
import { after, before, equals } from 'src/app/shared/util/datepicker.util';
import { ActionAddOrActiveTab } from '../../../../../../core/auth/auth.actions';
import { selectTabByCode } from '../../../../../../core/auth/auth.selectors';
import { AppState } from '../../../../../../core/core.state';
import { ITEMS_PER_PAGE } from '../../../../../../shared/constants/pagination.constants';
import { Organization } from '../../../../../../shared/model/organization.model';
import { getOuterHeight, getOverHeight, imageLinkFrom, isDefined, isNumber, padNumber } from '../../../../../../shared/util/common.util';
import { State } from '../../../../admin.state';
import { LoadOrganizations, OrganizationsDelete } from '../../actions/organization.actions';
import { selectOrganization } from '../../selectors/organization.selectors';
import { EncryptionComponent } from '../encryption/encryption.component';
import { OrganizationUpdateComponent } from './organization-update.component';
import {environment} from '@env/environment';

@Component({
    selector: 'app-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit, IComponentRender {
    page: any;
    itemsPerPage = ITEMS_PER_PAGE;
    previousPage: any;
    organizations: any;
    TextSearch = '';
    IsActive: any;
    DateFrom = '';
    DateTo = '';
    isCollapsed = false;
    hoveredDate;
    fromDate: any;
    toDate: any;
    fromDateTemp = '';
    toDateTemp = '';
    today: NgbDateStruct;
    resourceAPI = `${environment.serverResource}/Organization/`;

    @ViewChildren(ModalConfirmComponent) components: QueryList<ModalConfirmComponent>
    constructor(
        private store: Store<State>,
        public appStore: Store<AppState>,
        private modalService: NgbModal,
        public calendar: NgbCalendar,
        private el: ElementRef
    ) {
        this.previousPage = 1;
        this.page = 1;
    }

    ngOnInit() {
        this.IsActive = 2;
        const date = new Date();
        this.today = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
        this.store.pipe(select(selectOrganization)).subscribe(data => {
            this.organizations = data;
        });
        this.loadAll();
        setTimeout(() => {
            this.setComponentHeight(this.el);
        }, 0);
    }

    /**
     * set initial height for rest & view child of component
     * if not using please comment keep throw Error 'Method not implemented.'
     * @param _el host element reference
     */
    setComponentHeight(_el: ElementRef<any>) {
        const nativeElement = <HTMLElement>this.el.nativeElement;
        const tabContent = <HTMLElement>nativeElement.closest('.tab-content');
        // const tabWrapper = nativeElement.querySelector('.tab-wrapper');
        const tabCard = <HTMLElement>nativeElement.querySelector('.tab-wrapper>app-card>.card');
        const blockCard = <HTMLElement> tabCard.querySelector('.card-block-hid');
        const headerCard = <HTMLElement>tabCard.querySelector('.card-header');
        const headerHeight = getOuterHeight(headerCard);
        const searchCard = <HTMLElement>tabCard.querySelector('.card-search');
        // const overHeight = getOverHeight(tabContent);
        // const searchHeight = getOuterHeight(searchCard);
        // const maxHeight = tabContent.clientHeight - searchHeight - headerHeight - overHeight;
        // const tableResponsive = <HTMLElement>tabCard.querySelector('.table-responsive');
        // tableResponsive.style.minHeight = `${maxHeight}px`;
        blockCard.style.minHeight = `${tabContent.clientHeight - headerHeight}px`;
    }

    /**
     * set initial height for rest & modal reference of component
     * if not using please comment keep throw Error 'Method not implemented.'
     * @param _el host element reference
     */
    setReferenceModalRender(_el: ElementRef<any>) {
        console.log('Method not implemented.')
    }

    /**
     * check any date has to day?
     * @param date date want to check
     */
    isToday(date: NgbDateStruct) {
        if (!this.today) {
            return false;
        } else {
            return date.year === this.today.year && date.month === this.today.month && date.day === this.today.day;
        }
    }

    /**
     * process prepare data before open date picker
     */
    onShowDatePicker() {
        this.isCollapsed = !this.isCollapsed;
        if (this.toDateTemp === '') {
            this.DateFrom = '';
            this.DateTo = '';
            this.toDate = '';
            this.fromDate = '';
            this.fromDateTemp = '';
            this.toDateTemp = '';
        }
    }

    /**
     * Load all data when screen was accessed
     */
    loadAll() {
        if (this.toDateTemp === '') {
            this.fromDateTemp = '';
            this.toDateTemp = '';
            this.store.dispatch(new LoadOrganizations({
                pagination: {
                    DateFrom: this.fromDateTemp,
                    DateTo: this.toDateTemp,
                    TextSearch: this.TextSearch,
                    IsActive: this.IsActive,
                    currPage: this.page,
                    recordperpage: this.itemsPerPage
                }
            }));
        } else {
            this.fromDateTemp = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
            this.toDateTemp = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
            this.store.dispatch(new LoadOrganizations({
                pagination: {
                    DateFrom: this.fromDateTemp,
                    DateTo: this.toDateTemp,
                    TextSearch: this.TextSearch,
                    IsActive: this.IsActive,
                    currPage: this.page,
                    recordperpage: this.itemsPerPage
                }
            }));
        }
    }

    /**
     * handle event when clicked on add button
     */
    onAdd() {
        const modalRef = this.modalService.open(OrganizationUpdateComponent as Component, {
            size: 'lg',
            backdrop: 'static',
            container: '.tab-organization'
        });
        const organization = new Organization();
        modalRef.componentInstance.organizations = organization;
        this.page = 1;
    }

    /**
     * handle event when clicked on update organization button
     * @param item organization
     */
    updateOrganization(item: Organization) {
        const modalRef = this.modalService.open(OrganizationUpdateComponent as Component, {
            size: 'lg',
            backdrop: 'static',
            container: '.tab-organization'
        });
        const organization = Object.assign({}, item);
        modalRef.componentInstance.organizations = organization;
    }

    /**
     * handle event when clicked on delete origanization button
     * @param id id of organization
     * @param chkDelete can delete
     */
    deleteOrganization(id: number, chkDelete: any) {
        // const modalRef = this.modalService.open(OganizationDeleteComponent as Component, {
        //     size: 'sm',
        //     backdrop: 'static',
        //     container: '.tab-organization',
        //     windowClass: 'static-center'
        // });
        // modalRef.componentInstance.id = id;
        // modalRef.componentInstance.chkDelete = chkDelete;
        if (chkDelete === 'true') {
            // this.modalIgnore.show();
            const confirmDelete = this.components.find(x => !x.isNotify);
            confirmDelete.showReference(id);
        } else {
            // this.modalConfirm.showReference(id);
            const notifyDelete = this.components.find(x => x.isNotify);
            notifyDelete.show();
        }
        console.log('aaaa', this.components);
    }

    /**
     * handle event when clicked on search button
     */
    onSearch() {
        this.page = 1;
        this.loadAll();
    }

    /**
     * handle event when value of date picker was changed
     * @param date new date value
     */
    onDateChange(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
            this.DateFrom = this.formatDate(this.fromDate);
            this.fromDateTemp = date.year + '-' + date.month + '-' + date.day;
        } else if (this.fromDate && !this.toDate && after(date, this.fromDate) || equals(date, this.fromDate)) {
            this.isCollapsed = !this.isCollapsed;
            this.toDate = date;
            this.DateTo = this.formatDate(this.toDate);
            this.toDateTemp = date.year + '-' + date.month + '-' + date.day;
            this.onSearch();
        } else {
            this.toDate = null;
            this.fromDate = date;
            this.DateFrom = this.formatDate(this.fromDate);
            this.DateTo = '';
            this.fromDateTemp = date.year + '-' + date.month + '-' + date.day;
            this.toDateTemp = '';

        }
    }

    /**
     * process reset some data to screen go back init state
     */
    clear() {
        this.DateFrom = '';
        this.DateTo = '';
        this.toDate = '';
        this.fromDate = '';
        this.fromDateTemp = '';
        this.toDateTemp = '';
        this.onSearch();
    }

    /**
     * handle event when clicked page on pagination
     * @param page new page to display
     */
    loadPage(page) {
        this.store.dispatch(new LoadOrganizations({
            pagination: {
                DateFrom: this.fromDateTemp,
                DateTo: this.toDateTemp,
                TextSearch: this.TextSearch,
                IsActive: this.IsActive,
                currPage: page,
                recordperpage: this.itemsPerPage
            }
        }));
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);

    /**
     * process convert date from NgbDate format to yyyy/MM/dd format
     * @param date date want to convert new format
     */
    formatDate(date: NgbDate) {
        return date ? `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` : '';
    }

    /**
     * process tranform base64 string data of image to get link image
     */
    // imageLnkFrom = (base64String?: string) => imageLinkFrom(base64String, true);

    /**
     * handle event when clicked on encryption button
     */
    onOpenTab(code) {
        // code any thing to open Encrypt popup
        const modalRef = this.modalService.open(EncryptionComponent as Component,
            { size: 'lg', backdrop: 'static', container: '.tab-organization', windowClass: 'modal-stretch' });
        modalRef.componentInstance.organizationCode = code;
    }

    /**
     * hanle event when clicked on directive users screen button
     * @param orgCode organization code
     */
    onOpenTabUser(orgCode: string) {
        this.appStore.select(selectTabByCode, { tabCode: 'ADMIN_USER' }).subscribe(tab => {
            if (isDefined(tab)) {
                this.appStore.dispatch(new ActionAddOrActiveTab({ tab: Object.assign({}, tab), args: { user: { orgCode } } }));
            }
        });
    }

    /**
     * handle fire event from confirm modal
     * @param organizationId id of organization need to delete was binded from confirm modal
     */
    onAcceptedDelete(organizationId: any) {
        this.store.dispatch(new OrganizationsDelete({ organizationId }));
    };
}
