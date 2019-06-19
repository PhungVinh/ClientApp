import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../../../admin.state';
import {
    AddAttrRelations,
    DeleteAttrRelations,
    DeleteAttrRelationsSuccess,
    LoadAttrRelations,
    UpdateAttrRelations
} from '../../actions/attr-relation.actions';
import {
    selectCateChildByParent,
    selectCateChildNull,
    selectCategory,
    selectConstraintsById,
    selectConstraintsPagi,
    selectError,
    selectConstraints
} from '../../selectors/constraints.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeObjectService } from '../../services/typeObject/type-object.service';
import { LoadCategoryChildLink, LoadCategoryLink } from '../../actions/information-field.actions';
import { ITEMS_PER_PAGE } from '../../../../../../shared/constants/pagination.constants';
import { LoadOrganizations } from '../../actions/organization.actions';
import { ConstraintsService } from '../../services/constraints/constraints.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { Key } from 'selenium-webdriver';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/core/core.state';

@Component({
    selector: 'app-attr-relation',
    templateUrl: './attr-relation.component.html',
    styleUrls: ['./attr-relation.component.scss']
})
export class AttrRelationComponent implements OnInit {
    @ViewChild('modalConfig') modalConfig: ModalDirective;
    @ViewChild('modalLarge') modalLarge: ModalDirective;
    @ViewChild('modalConfigEdit') modalConfigEdit: ModalDirective;
    @ViewChild('modalLargeEdit') modalLargeEdit: ModalDirective;
    @ViewChild('clearForm') clearForm;
    @ViewChild('clearFormEdit') clearFormEdit;
    @ViewChild('modalDefaultAttr') modalDefaultAttr: ModalConfirmComponent;
    @ViewChild("nameConstraintsADD") nameFieldADD: ElementRef;
    @ViewChild("nameConstraintsEDIT") nameFielEdit: ElementRef;
    

    // public listAttrRelation: { data?: any; paging?: any; };
    listAttrRelation$: Observable<any>;
    public listTypeObject: any[];
    public selectCategory$: Observable<any[]>;
    public selectCategoryChild$: Observable<any[]>;
    public textSearch: string = '';
    public currentPage: any;
    public recordOfPage: any;
    public AttrRelationEdit: any;
    public AttrRelationDelete: any;
    public AttrRelationEditId: any;
    public AttrRelationDeleteId: any;
    public isSubmitAdd = false;
    public isSubmitEdit = false;
    public isDuplicate = false;
    page: any;
    itemsPerPage = ITEMS_PER_PAGE;
    previousPage: any;

    attrRelationForm = new FormGroup({
        Name: new FormControl('', [Validators.required]),
        ContraintsType: new FormControl('', [Validators.required]),
        LinkContraints: new FormControl(''),
        ContraintsValue: new FormControl(''),
    });

    EditAttrRelationForm = new FormGroup({
        Name: new FormControl('', [Validators.required]),
        ContraintsType: new FormControl('', [Validators.required]),
        LinkContraints: new FormControl(''),
        ContraintsValue: new FormControl(''),
    });

    constructor(
        private store: Store<State>, 
        private typeObjService: TypeObjectService, 
        private constraintsService: ConstraintsService,
        public actRoute: ActivatedRoute,
        public router: Router,
        public appStore: Store<AppState>,
        ) {
        this.previousPage = 1;
        this.page = 1;
    }

    ngOnInit() {
        // vinhnp
        this.attrRelationForm.setValue({
            Name: '',
            ContraintsType: '',
            LinkContraints: '0',
            ContraintsValue: '0',
        });
        // end vinhnp code
        this.store.dispatch(new LoadCategoryLink());
        this.store.dispatch(new LoadCategoryChildLink());
        this.getAllTypeShow();
        this.getAllCate();
        this.listAttrRelation$ = this.store.pipe(select(selectConstraintsPagi));
        console.log('dsfdsf', this.listAttrRelation$);
        this.getAllAttrRrelation();
    }

    getAllAttrRrelation() {
        this.store.dispatch(new LoadAttrRelations({
            pagination: {
              TextSearch: this.textSearch,
              CurrPage: this.page,
              recodperpage: this.itemsPerPage
            }
          }));
    }

    onSubmit() {
        this.isSubmitAdd = true;
        this.page = 1;
        if (this.name.valid && this.contraintsType.valid && this.isDuplicate === false) {
            this.addAttrRelation();
        }
        else  if(this.name.invalid){
            this.nameFieldADD.nativeElement.focus();
        }
    }

    addAttrRelation() {
        console.log('this.attrRelationForm-vinhs',this.attrRelationForm.value);
        this.constraintsService.addConstraint(this.attrRelationForm.value).subscribe((data) => {
            this.attrRelationForm.setValue({
                Name: '',
                ContraintsType: '',
                LinkContraints: '0',
                ContraintsValue: '0',
            });
            this.getAllAttrRrelation();
            this.isSubmitAdd = false;
            if (!this.isDuplicate) {
                this.resetForm();
            }
            this.isDuplicate = false;
            this.modalLarge.hide();
        },
            (error) => {
                this.isDuplicate = true;
                this.nameFieldADD.nativeElement.focus();
            }
        );
    }

    // Edit Attr Relation
    editAttrRelation() {
        this.isSubmitEdit = true;
        if (this.nameEdit.valid && this.contraintsTypeEdit.valid && this.isDuplicate === false) {
            // this.modalLargeEdit.hide();
            const contraints = this.EditAttrRelationForm.value;
            contraints.Id = this.AttrRelationEditId;
            this.constraintsService.updateConstraint(contraints).subscribe((data) => {
                this.store.dispatch(new LoadAttrRelations({
                    pagination: {
                        TextSearch: this.textSearch,
                        CurrPage: this.page,
                        recodperpage: this.itemsPerPage
                    }
                }));
                this.isSubmitEdit = false;
                this.isDuplicate = false;
                this.modalLargeEdit.hide();
                this.nameFielEdit.nativeElement.focus();
            },
                (error) => {
                    this.isDuplicate = true;
                    this.nameFielEdit.nativeElement.focus();
                }
            );
        }

    }

    getAllTypeShow() {
        this.typeObjService.getAllTypeObjectInConstraints().subscribe(data => {
            this.listTypeObject = data;
        });
    }

    getAllCate() {
        this.selectCategory$ = this.store.pipe(select(selectCategory));
    }

    changeCate(e) {
        this.store.dispatch(new LoadCategoryChildLink());
        this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(e.target.value)));
    }

    changeCateEdit(e) {
        this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(e.target.value)));
    }


    cancelValidateName() {
        this.isDuplicate = false;
    }

    getAtrrRelationById(id) {
        this.AttrRelationEditId = id;
        this.store.pipe(select(selectConstraintsById(id))).subscribe(data => {
            if (data) {
                console.log('data', data);
                this.AttrRelationEdit = data;
                if (data[0].LinkContraints !== "") {
                    this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(data[0].LinkContraints)));
                }
                this.EditAttrRelationForm.patchValue({
                    Name: data[0].Name,
                    ContraintsType: data[0].CategoryCode,
                    LinkContraints: data[0].LinkContraints ? data[0].LinkContraints : '0',
                    ContraintsValue: data[0].ContraintsValue ? data[0].ContraintsValue : '0',
                });
            }

        });
    }

    loadPage(page) {
        console.log('page2', page);
        this.store.dispatch(new LoadAttrRelations({
            pagination: {
                TextSearch: this.textSearch,
                CurrPage: page,
                recodperpage: this.itemsPerPage
            }
        }));
    }

    onSearch() {
        console.log('search');
        this.page = 1;
        this.store.dispatch(new LoadAttrRelations({
            pagination: {
                TextSearch: this.textSearch,
                CurrPage: this.page,
                recodperpage: this.itemsPerPage
            }
        }));
    }

    getItemAttrRelationToDelete(id: number) {
        this.AttrRelationDeleteId = id;
        console.log(this.AttrRelationDeleteId);
    }

    deleteAttrRelation() {
        console.log('id', this.AttrRelationDeleteId);
            this.store.dispatch(new DeleteAttrRelations({ Id: Number(this.AttrRelationDeleteId) }));
        
    }

    resetForm() {
        this.attrRelationForm.reset();
        this.EditAttrRelationForm.reset();
        this.clearForm.resetForm();
        this.clearFormEdit.resetForm();
        this.isSubmitAdd = false;
        this.isSubmitEdit = false;
        this.attrRelationForm.setValue({
            Name: '',
            ContraintsType: '',
            LinkContraints: '0',
            ContraintsValue: '0',
        });
        this.selectCategoryChild$ = this.store.pipe(select(selectCateChildNull()));
    }

    cancelFormAdd() {

        this.resetForm();
        this.clearForm.resetForm();
        this.modalConfig.hide();
        this.modalLarge.hide();
        this.attrRelationForm.reset();
        this.isDuplicate = false;
        this.isSubmitAdd = false;
        this.attrRelationForm.setValue({
            Name: '',
            ContraintsType: '',
            LinkContraints: '0',
            ContraintsValue: '0',
        });
    }

    cancelAddAttrRelation() {
        if (this.attrRelationForm.pristine) {
            this.resetForm();
            this.modalLarge.hide();
            this.attrRelationForm.setValue({
                Name: '',
                ContraintsType: '',
                LinkContraints: '0',
                ContraintsValue: '0',
            });
        } else {
            this.modalConfig.show();
        }
    }

    cancelEditAttrRelation() {
        if (this.EditAttrRelationForm.pristine) {
            this.EditAttrRelationForm.reset();
            this.resetForm();
            this.clearFormEdit.resetForm();
            this.modalLargeEdit.hide();
            this.modalConfigEdit.hide();
        }
        else {
            this.modalConfigEdit.show();
        }
    }

    cancelFormEdit() {
        this.modalLargeEdit.hide();
        this.modalConfigEdit.hide();
        this.resetForm();
        this.clearFormEdit.resetForm();
        this.EditAttrRelationForm.reset();
        this.EditAttrRelationForm.setValue({
            Name: '',
            ContraintsType: '',
            LinkContraints: '0',
            ContraintsValue: '0',
        });
    }

    /********* vinhnp *********/
    // Open Modal ADD
    OpenModalADD() {
        this.store.dispatch(new LoadCategoryLink());
        this.getAllCate();
        this.modalLarge.show();

    }

    // Open Modal Edit
    OpenModalEdit() {
        this.store.dispatch(new LoadCategoryLink());
        this.getAllCate();
        this.store.dispatch(new LoadCategoryChildLink());
        this.modalLargeEdit.show();
    }
    /*********End*********/

    get name() { return this.attrRelationForm.get('Name'); }
    get contraintsType() { return this.attrRelationForm.get('ContraintsType'); }

    get nameEdit() { return this.EditAttrRelationForm.get('Name'); }
    get contraintsTypeEdit() { return this.EditAttrRelationForm.get('ContraintsType'); }
}
