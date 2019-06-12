import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormGroup, FormControl, FormBuilder, FormArray, Validators} from '@angular/forms';
import {AttributeService} from '../../services/attribute/attribute.service';
import {DataTypeService} from '../../services/dataType/data-type.service';
import {TypeObjectService} from '../../services/typeObject/type-object.service';
import {FormConfigService} from '../../services/form-config/form-config.service';
import {State} from '../../../../admin.state';
import {
    LoadCategoryChildLink,
    LoadCategoryLink,
    LoadConstraints,
} from '../../actions/information-field.actions';
import {selectCateChildByParent, selectCategory, selectConstraints} from '../../selectors/constraints.selector';
import {forkJoin, Observable} from 'rxjs';
import {ModalDirective} from 'angular-bootstrap-md';
import {LoadAttribute} from '../../actions/customer.actions';
import {FormListComponent} from '../form-list/form-list.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-information-field',
    templateUrl: './information-field.component.html',
    styleUrls: ['./information-field.component.css']
})
export class InformationFieldComponent implements OnInit {
    @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
    @ViewChild('modalLarge') modalLarge: ModalDirective;
    @ViewChild('modalDefault') modalDefault: ModalDirective;
    @ViewChild('modalEditLarge') modalEditLarge: ModalDirective;
    @ViewChild('modalShowForm') modalShowForm: ModalDirective;
    @ViewChild('modalCancelForm') modalCancelForm: ModalDirective;
    @ViewChild('modalAcceptForm') modalAcceptForm: ModalDirective;
    @ViewChild('modalFormNull') modalFormNull: ModalDirective;
    @ViewChild('modalDefaultEdit') modalDefaultEdit: ModalDirective;
    @ViewChild('modalCancelFormTabChange') modalCancelFormTabChange: ModalDirective;
    @ViewChild('modalAcceptDeleteRow') modalAcceptDeleteRow: ModalDirective;
    @ViewChild('clearForm') clearForm;


    @ViewChild(FormListComponent)
    private formList: FormListComponent;

    attributeForm = new FormGroup({
        AttributeCode: new FormControl('Hệ thống tự sinh'),
        DataType: new FormControl('DataCode-01', [Validators.required]),
        AttributeWidth: new FormControl(''),
        IsReuse: new FormControl(false),
        AttributeDescription: new FormControl(''),
        DetailRefer: this.fb.array([]),
        AttributeType: new FormControl('TEXTBOX'),
        AttributeLabel: new FormControl('', [Validators.required]),
        IsVisible: new FormControl(true),
        IsRequired: new FormControl(false),
        IsDuplicate: new FormControl(false),
        IsTableShow: new FormControl(false),
        CategoryParentCode: new FormControl('0'),
        DefaultValue: new FormControl(''),
        DefaultValueWithTextBox: new FormControl(''),
    });

    attributeEditForm = new FormGroup({
        AttributesId: new FormControl(''),
        AttributeCode: new FormControl('', [Validators.required]),
        DataType: new FormControl('', [Validators.required]),
        AttributeWidth: new FormControl(''),
        IsReuse: new FormControl(''),
        AttributeDescription: new FormControl(''),
        DetailRefer: this.fb.array([]),
        AttributeType: new FormControl(''),
        AttributeLabel: new FormControl('', [Validators.required]),
        IsVisible: new FormControl(''),
        IsRequired: new FormControl(''),
        IsDuplicate: new FormControl(''),
        IsTableShow: new FormControl(''),
        CategoryParentCode: new FormControl(''),
        DefaultValue: new FormControl(''),
        DefaultValueWithTextBox: new FormControl(''),
    });

    done = [];

    prepairDrag = [];

    test = [
        {arr: this.done, title: ''},
    ];

    public listAttr: any[];
    public listAttrRequired: any[];
    public arrIdItemRequiredToSave: any[] = [];
    public arrOfItemEdit: any[];
    public listDataType: any[] = [];
    public listTypeObject: any[] = [];
    public listConstrains: any[];
    public isSubmitAdd = false;
    public isSubmitEdit = false;
    public IdArrConstraints = [];
    public listAttrWhenFormInfo = [];
    public listAttrWhenFormList = [];
    selectCategory$: Observable<any[]>;
    selectCategoryChild$: Observable<any[]>;
    selectCategoryChildEdit$: Observable<any[]>;
    selectAttrEdit: any;
    showButtonAddAttr = true;
    checkChange = false;
    checkChangeListForm = false;
    indexItemOfTestArr: any;
    typeAddOrEdit: any;
    objAttr: any = {};
    constraints: any = {};
    formId = 27;
    showDefaultValue: any = 2;
    showDefaultValueEdit: any;
    activeTab = 'ngb-tab-4';
    titleTab = 'Cấu hình form thông tin';
    lengthOfTest: any;
    typeEditAtr: any;
    rowToDelete: any[];
    indexRowTodelete: any;

    constructor(private store: Store<State>,
                private attrservice: AttributeService,
                private dataTypeService: DataTypeService,
                private typeObjService: TypeObjectService,
                private formConfig: FormConfigService,
                private fb: FormBuilder,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.getAllDataType();
        this.getAllTypeObject();
        this.getAllConstraints();
        this.getFormConfigFromDatabase();
        this.selectCategory$ = this.store.pipe(select(selectCategory));
        this.store.dispatch(new LoadCategoryLink());
        this.store.dispatch(new LoadCategoryChildLink());
        this.store.dispatch(new LoadAttribute({formId: this.formId}));
        this.attributeForm.get('CategoryParentCode').disable();
        this.attributeForm.get('DefaultValue').disable();
    }

    onSubmit() {
        this.isSubmitAdd = true;
        if (this.name.valid && this.dataType.valid && this.width.valid) {
            this.objAttr = Object.assign(this.attributeForm.value, this.constraints);
            this.objAttr.DetailRefer = this.IdArrConstraints;
            this.objAttr.ModuleParent = 'CIMS';
            this.addAttr(this.objAttr);
        }
    }

    addAttr(val) {
        this.attrservice.addAttribute(val).subscribe(data => {
            console.log('data add' , data);
            if (data !== undefined) {
                this.modalLarge.hide();
                this.prepairDrag.forEach(item => {
                    item.active = false;
                });
                Object.assign(data.TblVocattributes[0], {disabled: true, active: true});
                this.listAttr.push(data.TblVocattributes[0]);
                this.listAttrWhenFormInfo.push(data.TblVocattributes[0]);
                this.prepairDrag.push(data.TblVocattributes[0]);
                this.attributeForm.reset();
                this.attributeForm.patchValue({
                    AttributeCode: 'Hệ thống tự sinh',
                    IsVisible: true,
                    AttributeType: 'TEXTBOX',
                    DataType: 'DataCode-01'
                });
                this.showDefaultValue = 2;
                this.attributeForm.get('CategoryParentCode').disable();
                this.attributeForm.get('DefaultValue').disable();
                this.attributeForm.get('DefaultValueWithTextBox').enable();
                this.isSubmitAdd = false;
                this.IdArrConstraints = [];
                this.checkboxes.forEach((element) => {
                    element.nativeElement.checked = false;
                });
                if (data.TblVocattributes[0].IsRequired) {
                    this.listAttrRequired.push(data.TblVocattributes[0]);
                }
            }
        }, (error) => {
            console.log(error);
            // this.titleExits = true;
        });
    }

    updateAttr(val) {
        this.attrservice.updateAttribute(val).subscribe(data => {
           if (data !== undefined) {
               const itemActive = Object.assign({}, data.TblVocattributes[0]);
               if (itemActive.IsRequired === false) {
                   this.listAttrRequired = this.listAttrRequired.filter(item => item.AttributeCode !== itemActive.AttributeCode);
                   this.arrIdItemRequiredToSave = this.arrIdItemRequiredToSave.filter(item => item.AttributeCode !== itemActive.AttributeCode);
               }


               if (itemActive.IsRequired === true) {
                   if (this.listAttrRequired.some(elem => elem.AttributeCode === itemActive.AttributeCode)) {

                   } else {
                       this.listAttrRequired.push(Object.assign(itemActive, {IsRequired: true}));
                   }
               }
           }

            if (this.typeEditAtr === 1) {
                this.test.forEach(item => {
                    item.arr.forEach(item2 => {
                        if (item2.AttributeCode === val.AttributeCode) {
                            Object.assign(item2, data.TblVocattributes[0]);
                        }
                    });
                });
                Object.assign(this.listAttr.find(item => item.AttributeCode === val.AttributeCode), data.TblVocattributes[0]);
            }

            if (this.typeEditAtr === 2) {
                this.prepairDrag.forEach(item => {
                    if (item.AttributeCode === val.AttributeCode) {
                        Object.assign(item, data.TblVocattributes[0]);
                    }
                });
               Object.assign(this.listAttr.find(item => item.AttributeCode === val.AttributeCode), data.TblVocattributes[0]);
            }

            this.attributeEditForm.markAsPristine({onlySelf: true});
            this.modalEditLarge.hide();
            this.isSubmitEdit = false;
            this.IdArrConstraints = [];

        }, (error) => {
            // this.titleExits = true;
        });
    }


    onSubmitEdit() {
        this.isSubmitEdit = true;
        if (this.nameEdit.valid && this.dataTypeEdit.valid && this.codeEdit.valid && this.widthEdit.valid) {
            const objAttr = this.attributeEditForm.value;
            objAttr.DetailRefer = this.IdArrConstraints;
            objAttr.ModuleParent = 'CIMS';
            this.updateAttr(objAttr);
        }

    }

    getFormConfigFromDatabase() {
        const allAttr = [];
        const allAttrRequired = [];
        forkJoin(
            this.attrservice.getAllAttributes(),
            this.formConfig.getFormConfig(),
        )
            .subscribe(([res1, res2]) => {
                if (res2 !== null) {
                    this.test = [...[{arr: [], title: ''}]];
                }

                if (res1.length > 0) {
                    this.listAttrWhenFormInfo = res1;
                    res1.forEach((value, key) => {
                        allAttr.push(value);
                        value.index = key;
                        if (value.IsRequired) {
                            allAttrRequired.push(value);
                        }
                    });
                    this.listAttr = [...allAttr];
                    this.listAttrRequired = [...allAttrRequired];
                    console.log('dat', this.listAttr);
                } else {
                    this.listAttr = [];
                    this.listAttrWhenFormInfo = [];
                }

                if (res2 !== null) {
                    this.typeAddOrEdit = 2;
                    this.test = [];
                    res2.forEach(item => {
                            this.test.push({arr: item.children, title: (item.RowTitle ? item.RowTitle : '')});
                            item.children.forEach((item2, index, array) => {
                                this.listAttr.forEach((item3, index3) => {
                                    if (item3.AttributeCode === item2.AttributeCode) {
                                        item3.disabled = true;
                                    }
                                });
                            });
                        }
                    );
                    this.lengthOfTest = this.test.length;
                } else {
                    this.typeAddOrEdit = 1;
                    this.test = [
                        {arr: this.done, title: ''},
                    ];
                }
            });
    }

    getAttrForm(item, arr, index, typeEdit) {
        if (item.AttributeCode === 'ATTRIBUTE1' || item.AttributeCode === 'ATTRIBUTE2') {

        } else {
            this.modalEditLarge.show();
            if (typeEdit === 1) {
                this.typeEditAtr = 1;
                this.arrOfItemEdit = arr;
                this.indexItemOfTestArr = index;
            }
            if (typeEdit === 2) {
                this.typeEditAtr = 2;
            }
            this.selectAttrEdit = item;
            this.attributeEditForm.patchValue({
                AttributesId: item.AttributeId,
                AttributeCode: item.AttributeCode,
                DataType: item.DataType,
                AttributeWidth: item.AttributeWidth,
                IsReuse: item.IsReuse,
                IsRequired: item.IsRequired,
                IsDuplicate: item.IsDuplicate,
                IsTableShow: item.IsTableShow,
                AttributeDescription: item.AttributeDescription,
                AttributeType: item.AttributeType,
                AttributeLabel: item.AttributeLabel,
                IsVisible: item.IsVisible,
            });

            const arrType = ['CHECKBOX', 'DROPDOWNLIST', 'LISTCHECKBOX', 'RADIO', 'LISTRADIO'];
            if (arrType.includes(item.AttributeType)) {
                this.showDefaultValueEdit = 1;
                this.attributeEditForm.get('DefaultValue').enable();
                this.attributeEditForm.get('CategoryParentCode').enable();
                this.attributeEditForm.get('DefaultValueWithTextBox').disable();
                this.attributeEditForm.patchValue({
                    DefaultValueWithTextBox: '',
                    CategoryParentCode: item.CategoryParentCode ? item.CategoryParentCode : '0',
                    DefaultValue: item.DefaultValue ? item.DefaultValue : '0',
                });
            } else {
                this.showDefaultValueEdit = 2;
                this.attributeEditForm.get('CategoryParentCode').disable();
                this.attributeEditForm.get('DefaultValue').disable();
                this.attributeEditForm.get('DefaultValueWithTextBox').enable();
                this.attributeEditForm.patchValue({
                    CategoryParentCode: '0',
                    DefaultValue: '0',
                    DefaultValueWithTextBox: item.DefaultValueWithTextBox ? item.DefaultValueWithTextBox : '',
                });
            }

            this.IdArrConstraints = item.DetailRefer ? item.DetailRefer : [];
            this.selectCategoryChildEdit$ = this.store.pipe(select(selectCateChildByParent(item.CategoryParentCode ? item.CategoryParentCode : 0)));
        }
    }

    checkChecked(id) {
        if (this.selectAttrEdit && this.selectAttrEdit.DetailRefer != null) {
            if (this.selectAttrEdit.DetailRefer.includes(id.toString())) {
                return true;
            }
        }
    }

    getAllConstraints() {
        this.store.dispatch(new LoadConstraints());
        this.store.pipe(select(selectConstraints)).subscribe(data => {
            if (data !== undefined) {
                this.listConstrains = data;
            }
        });
    }

    onCheckboxChange(option, event) {
        if (event.target.checked) {
            this.IdArrConstraints.push(option.id.toString());
        } else {
            this.IdArrConstraints.forEach((item, index) => {
                if (item === option.id.toString()) {
                    this.IdArrConstraints.splice(index, 1);
                }
            });
        }
    }

    getAllDataType() {
        this.dataTypeService.getAllDataType().subscribe(data => {
            this.listDataType = data;
        });
    }

    getAllTypeObject() {
        this.typeObjService.getAllTypeObject().subscribe(data => {
            this.listTypeObject = data;
        });
    }

    drop2(event: CdkDragDrop<string[]>) {
        console.log('event', event);
        this.checkChange = true;
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            event.container.data.forEach((item, index) => {
                const newObj: any = item;
                newObj.AttrOrder = (index + 1);
                item = newObj;
            });
        } else {
            console.log(event.item.data);
            let totalCol = 0;
            event.container.data.forEach(val => {
                const newObj: any = val;
                totalCol += newObj.AttributeColumn;
            });
            totalCol += (event.item.data.AttributeColumn ? event.item.data.AttributeColumn : 3);

            if (totalCol < 13) {
                transferArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);
                this.listAttr = [...this.listAttrWhenFormInfo];
                this.listAttr.forEach(value => {
                    if (value.AttributeCode === event.item.data.AttributeCode) {
                        value.disabled = true;
                    }
                });
                this.test.forEach(item => {
                    if (item.arr.filter(item2 => item2.active).length > 0) {
                        item.arr.filter(item2 => item2.active)[0].active = false;
                    }
                });

                (event.container.data as Array<any>).forEach((item, index) => {
                    item.AttrOrder = index + 1;
                    if (item.AttributeColumn === undefined) {
                        item.AttributeColumn = 3;
                    } else {
                        item.AttributeColumn = item.AttributeColumn;
                    }

                    if (event.item.data.AttributeCode === item.AttributeCode) {
                        item.active = true;
                    }
                });
            }
        }

        this.test.forEach((val, index) => {
            if (val.arr.includes(event.item.data)) {
                event.item.data.RowIndex = index + 1;
            }
        });
    }

    drop4(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {

        } else {
            // transferArrayItem(event.previousContainer.data,
            //     event.container.data,
            //     event.previousIndex,
            //     event.currentIndex);
        }
    }

    drop3(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {

        } else {
            // transferArrayItem(event.previousContainer.data,
            //     event.container.data,
            //     event.previousIndex,
            //     event.currentIndex);
        }
    }

    addRow() {
        this.checkChange = true;
        this.test.push({
            arr: [],
            title: ''
        });
        this.lengthOfTest = this.test.length;
    }

    deleteRow(row, index) {
        this.rowToDelete = [];
        this.rowToDelete = [...row];
        this.indexRowTodelete = index;
        if (row.length > 0) {
            this.modalAcceptDeleteRow.show();
        } else {
            this.lengthOfTest = this.test.length - 1;
            this.test.splice(index, 1);
            this.test.forEach((val, key) => {
                val.arr.forEach(val2 => {
                    val2.RowIndex = key + 1;
                });
            });
        }
    }

    deleteRowAccept() {
        if (this.test.length > 1) {
            this.checkChange = true;
            this.lengthOfTest = this.test.length - 1;
            this.rowToDelete.forEach(item => {
                this.listAttr.forEach(item2 => {
                    if (item.AttributeCode === item2.AttributeCode) {
                        item2.disabled = false;
                        item2.AttributeColumn = 3;
                    }
                });
                if (item.IsRequired) {
                    this.arrIdItemRequiredToSave = this.arrIdItemRequiredToSave.filter(item2 => item2.AttributeCode !== item.AttributeCode);
                }
            });
            this.test.splice(this.indexRowTodelete, 1);
            this.test.forEach((val, key) => {
                val.arr.forEach(val2 => {
                    val2.RowIndex = key + 1;
                });
            });
            this.rowToDelete = [];
        } else {

        }
    }

    deleteAttr(item, arr) {
        this.checkChange = true;
        arr.forEach((val, index) => {
            if (item === val) {
                arr.splice(index, 1);
            }
        });
        this.listAttr.find(i => i.AttributeCode === item.AttributeCode).disabled = false;
        this.listAttr.find(i => i.AttributeCode === item.AttributeCode).AttributeColumn = 3;
        if (item.IsRequired) {
            this.arrIdItemRequiredToSave = this.arrIdItemRequiredToSave.filter(item2 => item2.AttributeCode !== item.AttributeCode);
        }
        arr.forEach((v, i) => {
            v.AttrOrder = i + 1;
        });
    }

    deleteAttrPrepair(item) {
        this.prepairDrag.forEach((val, index) => {
            if (item === val) {
                this.prepairDrag.splice(index, 1);
            }
        });
        this.listAttr.find(i => i.AttributeCode === item.AttributeCode).disabled = false;
    }

    getFormConfig() {
        if (this.test[0].arr.length === 0 || (this.listAttrRequired.length !== this.arrIdItemRequiredToSave.length)) {
            this.modalFormNull.show();
        } else {
            const totalItem = [];
            const objFormConfig = <any>{};
            this.test.forEach(item => {
                item.arr.forEach(item2 => {
                    item2.RowTitle = item.title;
                    totalItem.push(item2);
                });
            });

            objFormConfig.TblCimsattributeForm = totalItem;
            objFormConfig.TblCimsform = {
                'FormName': 'Thêm mới khách hàng dat',
                'FormDescription': 'Thêm mới khách hàng dat',
                'ChildCode': 'CIMS_ADD',
            };

            if (this.typeAddOrEdit === 1) {
                console.log('them moi');
                this.formConfig.addFormConfig(objFormConfig).subscribe(data => {
                    if (data !== undefined) {
                        this.getFormConfigFromDatabase();
                    }
                });
            }

            if (this.typeAddOrEdit === 2) {
                console.log('update');
                this.formConfig.updateFormConfig(objFormConfig).subscribe(data => {
                    if (data !== undefined) {
                        this.getFormConfigFromDatabase();
                    }
                });
            }
            this.arrIdItemRequiredToSave = [...[]];
            this.test.forEach(item => {
                item.arr.forEach(item2 => {
                    if (item2.IsRequired) {
                        this.arrIdItemRequiredToSave.push(item2);
                    }
                });
            });
            this.modalAcceptForm.hide();
        }
        console.log('11111', this.arrIdItemRequiredToSave);
        console.log('22222222222', this.listAttrRequired);

    }

    acceptFormConfig() {
        this.arrIdItemRequiredToSave = [...[]];
        this.test.forEach(item => {
            item.arr.forEach(item2 => {
                if (item2.IsRequired) {
                    this.arrIdItemRequiredToSave.push(item2);
                }
            });
        });
        console.log('11111', this.arrIdItemRequiredToSave);
        console.log('22222222222', this.listAttrRequired);
        console.log('222222222223333', this.test[0].arr.length);
        if (this.test[0].arr.length === 0 || (this.listAttrRequired.length !== this.arrIdItemRequiredToSave.length)) {
            this.modalFormNull.show();
        } else {
            this.modalAcceptForm.show();
        }
        this.checkChange = false;
    }

    addWidthAttr(item, arr, indexArr, indexItem, typeAdd) {
        let totalCol = 0;
        if (typeAdd === 1) {
            this.test[indexArr].arr.forEach(val => {
                totalCol += val.AttributeColumn;
            });
        }
        if (typeAdd === 2) {
            this.prepairDrag.forEach(val => {
                totalCol += val.AttributeColumn ? val.AttributeColumn : 3;
            });
        }

        if (totalCol < 12) {
            this.checkChange = true;
            let order = (item.AttributeColumn ? item.AttributeColumn : 3) + 3;
            item.AttributeColumn = order;
            if (typeAdd === 1) {
                document.getElementById('item' + indexArr + indexItem).className = 'col-md-' + order + ' m-t-15 example-box cdk-drag ng-star-inserted';
            }
            if (typeAdd === 2) {
                document.getElementById('itemPre' + indexItem).className = 'col-sm-' + order + ' m-t-15 active example-box cdk-drag ng-star-inserted';
            }
        }
    }

    minusWidthAttr(item, arr, indexArr, indexItem, typeMinus) {
        if (typeMinus === 1) {
            if (item.AttributeColumn > 3) {
                this.checkChange = true;
                let order = item.AttributeColumn - 3;
                item.AttributeColumn = order;
                document.getElementById('item' + indexArr + indexItem).className = 'col-md-' + order + ' m-t-15 example-box cdk-drag ng-star-inserted';
            }
        }
        if (typeMinus === 2) {
            this.checkChange = true;
            if (item.AttributeColumn > 3) {
                let order = (item.AttributeColumn ? item.AttributeColumn : 3) - 3;
                item.AttributeColumn = order;
                document.getElementById('itemPre' + indexItem).className = 'col-sm-' + order + ' m-t-15 active example-box cdk-drag ng-star-inserted';
            }

        }

    }

    checkcheckActiveTabFormList(e) {
        this.activeTab = e;
        this.getFormConfigFromDatabase();
        this.titleTab = 'Cấu hình form thông tin';
        this.showButtonAddAttr = true;
    }


    fetchNews(e) {
        if (this.checkChange === true && e.activeId === 'ngb-tab-4') {
            e.preventDefault();
            this.activeTab = '';
            if (e.activeId === 'ngb-tab-4') {
                this.modalCancelFormTabChange.show();
            }
        }

        if (this.checkChange === false && e.activeId === 'ngb-tab-4') {
            this.activeTab = e.nextId;
            if (this.activeTab === 'ngb-tab-3') {
                this.titleTab = 'Cấu hình form danh sách';
                this.showButtonAddAttr = false;
                setTimeout(() => {
                    this.listAttr = [...this.listAttrWhenFormList];
                }, 500);
            }
        }

        if (this.checkChangeListForm === true && e.activeId === 'ngb-tab-3') {
            e.preventDefault();
            this.activeTab = 'ngb-tab-3';
            if (e.activeId === 'ngb-tab-3') {
                this.formList.CancelFormListTabChange.show();
            }
        }

        if (this.checkChangeListForm === false && e.activeId === 'ngb-tab-3') {
            this.activeTab = e.nextId;
            if (this.activeTab === 'ngb-tab-4') {
                this.getFormConfigFromDatabase();
                this.titleTab = 'Cấu hình form thông tin';
                this.listAttr = [...this.listAttrWhenFormInfo];
                this.showButtonAddAttr = true;
            }
        }
    }

    cancelConfigWhenTabChange() {
        // this.getFormConfigFromDatabase();
        this.activeTab = 'ngb-tab-3';
        this.checkChange = false;
        this.modalCancelFormTabChange.hide();
        this.showButtonAddAttr = false;
    }


    changeCate(e) {
        this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(e.target.value)));
        this.attributeForm.get('DefaultValue').enable();
        this.attributeForm.patchValue({
            // CategoryParentCode: '0',
            DefaultValue: '0',
        });
    }

    changeCateEdit(e) {
        this.selectCategoryChildEdit$ = this.store.pipe(select(selectCateChildByParent(e.target.value)));
        this.attributeEditForm.get('DefaultValue').enable();
        this.attributeEditForm.patchValue({
            // CategoryParentCode: '0',
            DefaultValue: '0',
        });
    }

    changeAttributeType(e) {
        const arr = ['CHECKBOX', 'DROPDOWNLIST', 'LISTCHECKBOX', 'RADIO', 'LISTRADIO'];
        if (arr.includes(e.target.value)) {
            this.showDefaultValue = 1;
            // this.attributeForm.get('DefaultValue').enable();
            this.attributeForm.get('CategoryParentCode').enable();
            this.attributeForm.get('DefaultValueWithTextBox').disable();
            this.attributeForm.patchValue({
                DefaultValueWithTextBox: '',
            });
            this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(0)));
        }
        else {
            this.showDefaultValue = 2;
            this.attributeForm.get('CategoryParentCode').disable();
            this.attributeForm.get('DefaultValue').disable();
            this.attributeForm.get('DefaultValueWithTextBox').enable();
            this.attributeForm.patchValue({
                CategoryParentCode: '0',
                DefaultValue: '0',
            });
        }
    }

    changeAttributeTypeEdit(e) {
        const arr = ['CHECKBOX', 'DROPDOWNLIST', 'LISTCHECKBOX', 'RADIO', 'LISTRADIO'];
        if (arr.includes(e.target.value)) {
            this.showDefaultValueEdit = 1;
            this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(0)));
            this.attributeEditForm.get('CategoryParentCode').enable();
            this.attributeEditForm.get('DefaultValue').disable();
            this.attributeEditForm.patchValue({
                CategoryParentCode: '0',
            });
            // this.attributeEditForm.get('DefaultValue').enable();
            this.attributeEditForm.get('DefaultValueWithTextBox').disable();
            this.attributeEditForm.patchValue({
                DefaultValueWithTextBox: '',
            });
            this.selectCategoryChildEdit$ = this.store.pipe(select(selectCateChildByParent(0)));
        }
        else {
            this.showDefaultValueEdit = 2;
            this.attributeEditForm.get('CategoryParentCode').disable();
            this.attributeEditForm.get('DefaultValue').disable();
            this.attributeEditForm.get('DefaultValueWithTextBox').enable();
            this.attributeEditForm.patchValue({
                CategoryParentCode: '0',
                DefaultValue: '0',
            });
        }
    }

    deleteConfigAttr() {
        this.modalLarge.hide();
        this.modalDefault.hide();
        this.attributeForm.reset();
        this.clearForm.resetForm();
        this.isSubmitAdd = false;
        this.attributeForm.patchValue({
            AttributeCode: 'Hệ thống tự sinh',
            IsReuse: false,
            AttributeType: 'TEXTBOX',
            IsVisible: true,
            DataType: 'DataCode-01'
        });
        this.attributeForm.get('CategoryParentCode').disable();
        this.attributeForm.get('DefaultValue').disable();
        this.attributeForm.get('DefaultValueWithTextBox').enable();
        this.showDefaultValue = 2;
        this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(0)));
    }

    deleteConfigEdit() {
        this.modalEditLarge.hide();
        this.modalDefaultEdit.hide();
        this.isSubmitEdit = false;
        this.attributeEditForm.markAsPristine({onlySelf: true});
    }

    getListAttrFromFormList(e) {
        this.listAttrWhenFormList = [...e];
        this.listAttr = [...this.listAttrWhenFormList];
    }

    deleteAttrFromFormList(item) {
        // this.listAttr.push(item);
    }

    cancelConfigForm() {
        this.prepairDrag = [...[]];
        this.getFormConfigFromDatabase();
        this.modalCancelForm.hide();
        this.checkChange = false;
    }

    deleteRowFormList(data) {
        if (data !== null) {
            data.forEach(item => {
                this.listAttr.push(item);
            });
        }
    }

    cancelModalAddAttr() {
        if (this.attributeForm.pristine) {
            this.modalLarge.hide();
            this.attributeForm.reset();
            this.clearForm.resetForm();
            this.attributeForm.patchValue({
                AttributeCode: 'Hệ thống tự sinh',
                IsVisible: true,
                AttributeType: 'TEXTBOX',
                DataType: 'DataCode-01'
            });
            this.isSubmitAdd = false;
        } else {
            this.modalDefault.show();
        }
    }

    cancelModalAddEdit() {
        if (this.attributeEditForm.pristine) {
            this.modalEditLarge.hide();
        } else {
            this.modalDefaultEdit.show();
        }
    }

    checkChangeFormList(e) {
        this.checkChangeListForm = e;

    }

    hover() {
        this.prepairDrag.forEach(item => {
            item.active = false;
        });

        this.test.forEach(item => {
            item.arr.forEach(item2 => {
                item2.active = false;
            });
        });
    }

    openVerticallyCentered(content) {
        this.modalService.open(content, { centered: true, size: 'lg' });
    }

    get name() {
        return this.attributeForm.get('AttributeLabel');
    }

    get nameEdit() {
        return this.attributeEditForm.get('AttributeLabel');
    }

    get dataType() {
        return this.attributeForm.get('DataType');
    }

    get dataTypeEdit() {
        return this.attributeEditForm.get('DataType');
    }

    get codeEdit() {
        return this.attributeEditForm.get('AttributeCode');
    }

    get width() {
        return this.attributeForm.get('AttributeWidth');
    }

    get widthEdit() {
        return this.attributeEditForm.get('AttributeWidth');
    }
}

