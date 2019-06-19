import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AttributeService} from '../../services/attribute/attribute.service';
import {FormConfigService} from '../../services/form-config/form-config.service';
import {LoadCategoryChildLink, LoadCategoryLink, LoadConstraints} from '../../actions/information-field.actions';
import {LoadAttributesFormList, LoadAttributess} from '../../actions/attributes.actions';
import {State} from '../../../../admin.state';
import {select, Store} from '@ngrx/store';
import {
    selectAllAttrFormList,
} from '../../selectors/attributes.selector';
import {forkJoin, Observable} from 'rxjs';
import {ModalDirective} from 'angular-bootstrap-md';
import {selectCateChildByParent, selectCategory, selectConstraints} from '../../selectors/constraints.selector';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTypeService} from '../../services/dataType/data-type.service';
import {TypeObjectService} from '../../services/typeObject/type-object.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-form-list',
    templateUrl: './form-list.component.html',
    styleUrls: ['./form-list.component.css'],
})
export class FormListComponent implements OnInit {
    @Input() listAttrFormInfor: any[];
    @Output() dataLissAttr = new EventEmitter<any[]>();
    @Output() deleteAttr = new EventEmitter<any[]>();
    @Output() deleteRowOutput = new EventEmitter<any[]>();
    @Output() checkChangeEmit = new EventEmitter<any>();
    @Output() checkActiveTab = new EventEmitter<any>();
    @ViewChild('modalAcceptForm') modalAcceptForm: ModalDirective;
    @ViewChild('titleTableNull') titleTableNull: ModalDirective;
    @ViewChild('modalCancelFormList') modalCancelFormList: ModalDirective;
    @ViewChild('modalCancelTable') modalCancelTable: ModalDirective;
    @ViewChild('modalLarge') modalLarge: ModalDirective;
    @ViewChild('modalEditLarge') modalEditLarge: ModalDirective;
    @ViewChild('modalConfigFieldSearch') modalConfigFieldSearch: ModalDirective;
    @ViewChild('modalCancelAttrSearch') modalCancelAttrSearch: ModalDirective;
    @ViewChild('modalNullItemDragDrop') modalNullItemDragDrop: ModalDirective;
    @ViewChild('modalShowFormList') modalShowFormList: ModalDirective;
    @ViewChild('CancelFormListTabChange') CancelFormListTabChange: ModalDirective;
    @ViewChild('modalAcceptDeleteRow') modalAcceptDeleteRow: ModalDirective;

    public listAttributes: any[] = [];
    public listAttributesFormList: any[] = [];

    arrayAttributeDropItem = [];
    public listDataType: any[] = [];
    public listTypeObject: any[] = [];
    public listConstrains: any[] = [];
    public listTitleTable: any[] = [];
    public listTitleTableNotChange: any[] = [];
    public listdragNotChange: any[] = [];
    public listTitleToDrag: any[] = [];
    public listToTable: any[] = [];
    public listOutTable: any[] = [];
    public checkAllListDrag = false;
    public checkAllListTitleTable = false;
    attributeFormList$: Observable<any>;
    selectCategoryChild$: Observable<any[]>;
    selectCategory$: Observable<any[]>;
    sort = false;
    isAddOrEdit: any;
    showErrorNull = false;
    checkChange = false;
    checkChangeFormList = false;
    termTitleTable = '';
    termTitleToDrag = '';
    itemIdToSort: any;
    lengthOfarrayAttributeDropItem: any;
    rowToDelete: any[];
    indexRowTodelete: any;

    arrayAttributeDrop = [
        {arr: this.arrayAttributeDropItem},
    ];

    configSearch = new FormGroup({
        AttributeCode: new FormControl(),
        AttributeType: new FormControl('TEXTBOX'),
        DefaultValue: new FormControl(''),
        IsShowLabel: new FormControl(true)
    });

    // di chuyen phan tu mang
    public itemMove: any = {};
    public indexItemMove: any;

    constructor(private store: Store<State>, private modalService: NgbModal, private attrservice: AttributeService, private formConfig: FormConfigService, private dataTypeService: DataTypeService, private typeObjService: TypeObjectService) {
    }

    ngOnInit() {
        this.getData();
        this.getAllDataType();
        this.getAllTypeObject();
        this.getAllConstraints();
        this.store.dispatch(new LoadAttributess());
        this.store.dispatch(new LoadAttributesFormList());
        this.store.dispatch(new LoadCategoryLink());
        this.store.dispatch(new LoadCategoryChildLink());
        this.attributeFormList$ = this.store.pipe(select(selectAllAttrFormList));
        this.selectCategory$ = this.store.pipe(select(selectCategory));
    }

    getData() {
        const allAttr = [];
        const listTitleTableNotChange1 = [];
        const listdragNotChange1 = [];
        forkJoin(
            this.attrservice.getAllAttributes(),
            this.formConfig.getFormList(),
        )
            .subscribe(([res1, res2]) => {
                console.log('res2', res2);
                if (res1 !== undefined && res1.length > 0) {
                    this.listAttributesFormList = res1.slice();
                    res1.forEach((value, key) => {
                        allAttr.push(value);
                        value.index = key;

                        if (value.IsSort !== null) {
                            this.sort = value.IsSort;
                        }

                        if (value.IsTableShow) {
                            // this.listTitleTable[value.IndexTitleTable - 1] = value;
                            listTitleTableNotChange1.push(value);
                            this.listTitleTable = [...listTitleTableNotChange1];
                            this.listTitleTableNotChange = [...listTitleTableNotChange1];
                        } else {
                            listdragNotChange1.push(value);
                            this.listTitleToDrag = [...listdragNotChange1];
                            this.listdragNotChange = [...listdragNotChange1];
                        }
                    });
                    this.listAttributes = allAttr;
                }

                if (res2 !== null) {
                       this.isAddOrEdit = 2;
                       console.log('update');
                       if (res2.length > 0) {
                           this.arrayAttributeDrop = [];
                           res2.forEach(item => {
                               this.arrayAttributeDrop.push({arr: item.children});
                               if (item.children !== null) {
                                   item.children.forEach((item2, index, array) => {
                                       this.listAttributes.forEach((item3, index3) => {
                                           if (item3.AttributeCode === item2.AttributeCode) {
                                               item3.disabled = true;
                                           }
                                       });

                                   });
                               }
                           });
                       } else {
                           this.arrayAttributeDrop = [
                               {arr: []},
                           ];
                           console.log('else');
                       }

                } else {
                    this.isAddOrEdit = 1;
                    this.arrayAttributeDrop = [
                        {arr: []},
                    ];
                    console.log('add');
                }
                this.lengthOfarrayAttributeDropItem = this.arrayAttributeDrop.length;
                this.dataLissAttr.emit(this.listAttributes);
            });
    }

    showInfoFormList(content) {
        this.modalService.open(content, { centered: true, size: 'lg' });
    }

    openModalConfigTable(content) {
        this.modalService.open(content, { centered: true, size: 'lg' });
    }

    addRow() {
        this.arrayAttributeDrop.push({
            arr: []
        });
        this.lengthOfarrayAttributeDropItem = this.arrayAttributeDrop.length;
        this.checkChangeFormList = true;
        this.checkChangeEmit.emit(this.checkChangeFormList);
    }

    deleteRow(row, index, content) {
        this.rowToDelete = [];
        this.rowToDelete = [...row];
        this.indexRowTodelete = index;
        if (row.length > 0) {
            // this.modalAcceptDeleteRow.show();
            this.modalService.open(content, { centered: true });
        } else {
            this.lengthOfarrayAttributeDropItem = this.lengthOfarrayAttributeDropItem - 1;
            this.arrayAttributeDrop.splice(index, 1);
            this.arrayAttributeDrop.forEach((val, key) => {
                val.arr.forEach(val2 => {
                    val2.RowIndex = key + 1;
                });
            });
        }
    }

    deleteRowAcceptFormList() {
        if (this.arrayAttributeDrop.length > 1) {
            // this.modalAcceptDeleteRow.hide();
            this.modalService.dismissAll();
            this.checkChangeFormList = true;
            this.checkChangeEmit.emit(this.checkChangeFormList);
            this.lengthOfarrayAttributeDropItem = this.arrayAttributeDrop.length - 1;
            this.rowToDelete.forEach(item => {
                this.listAttributes.forEach(item2 => {
                    if (item.AttributeCode === item2.AttributeCode) {
                        item2.disabled = false;
                    }
                });
            });
            this.arrayAttributeDrop.splice(this.indexRowTodelete, 1);
            this.deleteRowOutput.emit(this.indexRowTodelete);
            this.arrayAttributeDrop.forEach((val, key) => {
                val.arr.forEach(val2 => {
                    val2.RowIndex = key + 1;
                });
            });
        } else {

        }
    }

    drop2(event: CdkDragDrop<string[]>) {
        console.log(event);
        this.checkChangeFormList = true;
        this.checkChangeEmit.emit(this.checkChangeFormList);
        if (event.previousContainer === event.container) {
            this.modalService.dismissAll();
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            event.container.data.forEach((item, index) => {
                const newObj: any = item;
                newObj.AttrOrder = (index + 1);
                item = newObj;
            });
        } else {
            let totalCol = 0;
            event.container.data.forEach(val => {
                const newObj: any = val;
                totalCol += newObj.AttributeColumn;
            });
            totalCol += (event.item.data.AttributeColumn ? event.item.data.AttributeColumn : 3);

            if (totalCol < 13) {
                this.checkChangeFormList = true;
                const arrTotal = [];
                this.arrayAttributeDrop.forEach(item => {
                    arrTotal.push(item.arr);
                });
                console.log(arrTotal);
                console.log(event.previousContainer.data);
                if (!arrTotal.includes(event.previousContainer.data)) {
                    // this.modalConfigFieldSearch.show();
                    this.modalService.open(this.modalConfigFieldSearch, { centered: true });
                    this.getInfoConfigSearch((Object.assign((event.item.data as any), {IsShowLabel: true})));
                }
                transferArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);
                (event.item.data as any).AttributeColumn = 3;

                this.listAttributes = this.listAttributesFormList.slice();
                this.listAttributes.forEach(value => {
                    if (value.AttributeCode === event.item.data.AttributeCode) {
                        value.disabled = true;
                    }
                });
                this.arrayAttributeDrop.forEach(item => {
                    if (item.arr.filter(item2 => item2.active).length > 0) {
                        item.arr.filter(item2 => item2.active)[0].active = false;
                    }
                });

                (event.container.data as Array<any>).forEach((item, index) => {
                    item.AttrOrder = index + 1;
                    item.IsShowLabel = true;
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
            this.dataLissAttr.emit(this.listAttributes);
        }

        this.arrayAttributeDrop.forEach((val, index) => {
            if (val.arr.includes(event.item.data)) {
                event.item.data.RowIndex = index + 1;
            }
        });
    }

    drop4(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {

        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    deleteAttrList(item, arr) {
        arr.forEach((val, index) => {
            if (item.AttributeCode === val.AttributeCode) {
                arr.splice(index, 1);
            }
        });
        this.listAttributes.find(i => i.AttributeCode === item.AttributeCode).disabled = false;
        arr.forEach((v, i) => {
            v.AttrOrder = i + 1;
        });
        this.deleteAttr.emit(item);
        this.checkChangeFormList = true;
        this.checkChangeEmit.emit(this.checkChangeFormList);
    }

    addWidthAttr(item, arr, indexArr, indexItem) {
        let totalCol = 0;
        this.arrayAttributeDrop[indexArr].arr.forEach(val => {
            totalCol += val.AttributeColumn;
        });
        if (totalCol < 12) {
            let order = item.AttributeColumn + 3;
            item.AttributeColumn = order;
            document.getElementById('item' + indexArr + indexItem).className = 'col-md-' + order + ' m-t-15 example-box cdk-drag ng-star-inserted';
            this.checkChangeFormList = true;
            this.checkChangeEmit.emit(this.checkChangeFormList);
        }
    }

    minusWidthAttr(item, arr, indexArr, indexItem) {
        if (item.AttributeColumn > 3) {
            let order = item.AttributeColumn - 3;
            item.AttributeColumn = order;
            document.getElementById('item' + indexArr + indexItem).className = 'col-md-' + order + ' m-t-15 example-box cdk-drag ng-star-inserted';
            this.checkChangeFormList = true;
            this.checkChangeEmit.emit(this.checkChangeFormList);
        }
    }

    changeToTable(e, item) {
        if (e.target.checked) {
            this.listToTable.push(item);
        } else {
            this.listToTable.forEach((val, index) => {
                if (val.AttributeCode === item.AttributeCode) {
                    this.listToTable.splice(index, 1);
                }
            });
        }
    }

    pushToTable(content) {
        if (this.checkAllListDrag) {
            (document.getElementById('allDrag') as HTMLInputElement).checked = false;
        }

        if (this.listToTable.length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            this.listTitleTable = [...this.listTitleTable, ...this.listToTable];

            this.listToTable.forEach((item, bindex, barray) => {
                this.listTitleToDrag.forEach((item2, index, array) => {
                    if (item.AttributeCode === item2.AttributeCode) {
                        this.listTitleToDrag.splice(index, 1);
                    }

                });
            });
            this.checkChange = true;
            this.listToTable = [];
            this.checkAllListDrag = false;
        }
    }

    pushToListDrag(content) {
        if (this.checkAllListTitleTable) {
            (document.getElementById('allTitle') as HTMLInputElement).checked = false;
        }

        if (this.listOutTable.length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            this.listTitleToDrag = [...this.listTitleToDrag, ...this.listOutTable];

            this.listOutTable.forEach((item, bindex, barray) => {
                this.listTitleTable.forEach((item2, index, array) => {
                    if (item.AttributeCode === item2.AttributeCode) {
                        this.listTitleTable.splice(index, 1);
                    }

                });
            });
            this.checkChange = true;
            this.listOutTable = [];
            this.checkAllListTitleTable = false;
        }
    }

    changeToListDrag(e, item) {
        if (e.target.checked) {
            this.listOutTable.push(item);
        } else {
            this.listOutTable.forEach((val, index) => {
                if (val.AttributeCode === item.AttributeCode) {
                    this.listOutTable.splice(index, 1);
                }
            });
        }
    }

    checkAllListDragBox(e) {
        if (e.target.checked) {
            this.checkAllListDrag = true;
            this.listToTable = [...this.listTitleToDrag];
        } else {
            this.checkAllListDrag = false;
            this.listToTable = [];
        }

    }

    checkAllListTitleTableCox(e) {
        if (e.target.checked) {
            this.checkAllListTitleTable = true;
            this.listOutTable = [...this.listTitleTable];
        } else {
            this.checkAllListTitleTable = false;
            this.listOutTable = [];
        }
    }

    activeItem(item, index) {
        this.listTitleTable.forEach((val, key) => {
            (document.getElementById('itemActive' + key) as HTMLElement).className = '';
        });
        (document.getElementById('itemActive' + index) as HTMLElement).className = 'active';
        this.itemMove = item;
        this.indexItemMove = index;
    }

    moveFirst(content) {
        if (Object.keys(this.itemMove).length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            if (this.indexItemMove > 0 && this.indexItemMove <= (this.listTitleTable.length - 1)) {
                this.listTitleTable.splice(0, 0, this.listTitleTable.splice(this.indexItemMove, 1)[0]);
                this.indexItemMove = 0;
                this.checkChange = true;
            }
        }
    }

    moveLast(content) {
        if (Object.keys(this.itemMove).length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            if (this.indexItemMove >= 0 && this.indexItemMove < (this.listTitleTable.length - 1)) {
                this.listTitleTable.splice(this.listTitleTable.length, 0, this.listTitleTable.splice(this.indexItemMove, 1)[0]);
                this.indexItemMove = this.listTitleTable.length - 1;
                this.checkChange = true;
            }
        }
    }

    moveUp(content) {
        if (Object.keys(this.itemMove).length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            if (this.indexItemMove > 0 && this.indexItemMove <= (this.listTitleTable.length - 1)) {
                this.listTitleTable.splice(this.indexItemMove - 1, 0, this.listTitleTable.splice(this.indexItemMove, 1)[0]);
                this.indexItemMove = this.indexItemMove - 1;
                this.checkChange = true;
            }
        }
    }

    moveDown(content) {
        if (Object.keys(this.itemMove).length === 0) {
            // this.modalNullItemDragDrop.show();
            this.modalService.open(content, { centered: true });
        } else {
            if (this.indexItemMove >= 0 && this.indexItemMove < (this.listTitleTable.length - 1)) {
                this.listTitleTable.splice(this.indexItemMove + 1, 0, this.listTitleTable.splice(this.indexItemMove, 1)[0]);
                this.indexItemMove = this.indexItemMove + 1;
                this.checkChange = true;
            }
        }
    }

    submitFormList(content) {
        if (this.listTitleTable.length > 0) {
            this.modalService.dismissAll();
            this.checkChangeFormList = false;
            this.checkChangeEmit.emit(this.checkChangeFormList);
            const totalItem = [];
            const objFormConfig = <any>{};
            this.arrayAttributeDrop.forEach((item, k) => {
                console.log('test luu', this.arrayAttributeDrop);
                if (item.arr === null || item.arr.length === 0) {
                    this.arrayAttributeDrop.splice(k, 1);
                    this.lengthOfarrayAttributeDropItem = this.lengthOfarrayAttributeDropItem - 1;
                }
            });
            console.log('test luu sau xoa', this.arrayAttributeDrop);

            this.arrayAttributeDrop.forEach((item, k) => {
                if (item.arr !== null) {
                    item.arr.forEach((item2, k2) => {
                        totalItem.push(Object.assign(item2, {RowIndex: k + 1, AttrOrder: k2 + 1}));
                    });
                }
            });

            objFormConfig.tblCimsattributeForm = totalItem;
            objFormConfig.tblCimsForm = {
                'ChildCode': 'CIMS_LIST',
            };

            if (this.isAddOrEdit === 2) {
                this.formConfig.updateFormList(objFormConfig).subscribe(data => {
                    console.log(data);
                });
            }

            if (this.isAddOrEdit === 1) {
                this.formConfig.addFormList(objFormConfig).subscribe(data => {
                    console.log(data);
                });
            }
        } else {
            // this.titleTableNull.show();
            this.modalService.open(content, { centered: true });
        }
    }

    cancelConfigFormList() {
        this.getData();
        this.listTitleTable = [];
        this.listTitleToDrag = [];
        this.listTitleTable = [...this.listTitleTableNotChange];
        this.listTitleToDrag = [...this.listdragNotChange];
        // this.modalCancelFormList.hide();
        this.modalService.dismissAll();
        this.checkChangeFormList = false;
        this.checkChangeEmit.emit(this.checkChangeFormList);
    }

    cancelConfigTable() {
        this.modalService.dismissAll();
        this.getData();
        this.indexItemMove = this.listTitleTable.length + 1;
        this.listTitleTable.forEach((val, key) => {
            (document.getElementById('itemActive' + key) as HTMLElement).className = '';
        });

        this.listTitleTable = [...this.listTitleTableNotChange];
        this.listTitleToDrag = [...this.listdragNotChange];
        this.itemMove = Object.assign({});
        this.checkAllListTitleTable = false;
        (document.getElementById('allTitle') as HTMLInputElement).checked = false;
        (document.getElementById('allDrag') as HTMLInputElement).checked = false;
        this.checkChange = false;
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

    getAllConstraints() {
        this.store.dispatch(new LoadConstraints());
        this.store.pipe(select(selectConstraints)).subscribe(data => {
            if (data !== undefined) {
                this.listConstrains = data;
            }
        });
    }

    chooseSort(e) {
        this.checkChange = true;
        this.itemIdToSort = e.target.value;
        this.listTitleTable.forEach(item => {
            if (item.AttributesId == this.itemIdToSort) {
                (item as any).IsSort = this.sort;
            }
        });
    }

    saveConfigTable(content) {
        if (this.listTitleTable.length === 0) {
            // this.titleTableNull.show();
            this.modalService.open(content, { centered: true });
        } else {
            // this.modalLarge.hide();
            this.modalService.dismissAll();
            this.listTitleTable.forEach((item, index) => {
                const object: any = {};
                object.IsTableShow = true;
                object.IndexTitleTable = index + 1;
                if (item.AttributesId == this.itemIdToSort) {
                    object.IsSort = this.sort;
                }
                Object.assign(item, object);
            });
            this.formConfig.updateTableFormList(this.listTitleTable).subscribe(item => {
                console.log(item);
            });
            this.listTitleTable.forEach((val, key) => {
                (document.getElementById('itemActive' + key) as HTMLElement).className = '';
            });
            this.indexItemMove = this.listTitleTable.length + 1;
            this.itemMove = Object.assign({});
            (document.getElementById('allTitle') as HTMLInputElement).checked = false;
            (document.getElementById('allDrag') as HTMLInputElement).checked = false;
            this.checkChange = false;
        }
    }


    radioChange(isSort) {
        this.checkChange = true;
        this.sort = isSort;
    }

    getInfoConfigSearch(item) {
        if (item.CategoryParentCode !== null) {
            this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(item.CategoryParentCode)));
        }
        this.configSearch.patchValue({
            AttributeType: 'DROPDOWNLIST',
            AttributeCode: item.AttributeCode,
            DefaultValue: 'all',
            IsShowLabel: 'true'
        });
        this.configSearch.get('DefaultValue').enable();
        this.configSearch.markAsPristine({onlySelf: true});
    }

    getInfoConfigSearchToEdit(item) {
        const arr = ['CHECKBOX', 'DROPDOWNLIST', 'LISTCHECKBOX', 'RADIO', 'LISTRADIO'];
        if (arr.includes(item.AttributeType)) {
            this.configSearch.get('DefaultValue').enable();
        } else {
            this.configSearch.get('DefaultValue').disable();
        }
        console.log('2222', item);
        if (item.CategoryParentCode !== null) {
            this.selectCategoryChild$ = this.store.pipe(select(selectCateChildByParent(item.CategoryParentCode)));
        }
        this.configSearch.patchValue({
            AttributeType: item.AttributeType,
            AttributeCode: item.AttributeCode,
            DefaultValue: item.DefaultValue ? item.DefaultValue : 'all',
            IsShowLabel: item.IsShowLabel
        });
        this.configSearch.markAsPristine({onlySelf: true});
    }

    submitConfigSearch(value) {

        this.arrayAttributeDrop.forEach(item => {
            item.arr.forEach((item2) => {
                if (item2.AttributeCode === value.AttributeCode) {
                    this.attrservice.updateAttributeSearch(Object.assign(item2, value, {ChildCode: 'CIMS_LIST'})).subscribe(data => {

                    });
                    item2.active = true;
                }
            });
        });

        this.modalService.dismissAll();
    }

    cancelConfigWhenTabListChange() {
        this.checkChangeFormList = false;
        this.checkChangeEmit.emit(this.checkChangeFormList);
        // this.CancelFormListTabChange.hide();
        this.modalService.dismissAll();
        this.checkActiveTab.emit('ngb-tab-4');
    }

    cancelModalConfigLisst(content) {
        if (this.checkChange) {
            this.modalService.open(content, { centered: true });
        } else {
            this.modalService.dismissAll();
        }
    }

    cancelFormList(content) {
        if (this.checkChangeFormList) {
            // this.modalCancelFormList.show();
            this.modalService.open(content, { centered: true });
        } else {

        }
    }

    cancelConfigAttrSearch() {
        this.modalService.dismissAll();
        this.configSearch.markAsPristine({onlySelf: true});
    }

    changeAttributeType(e) {
        const arr = ['CHECKBOX', 'DROPDOWNLIST', 'LISTCHECKBOX', 'RADIO', 'LISTRADIO'];
        if (arr.includes(e.target.value)) {
            this.configSearch.get('DefaultValue').enable();
            this.configSearch.patchValue({
                DefaultValue: 'all',
            });
        } else {
            this.configSearch.get('DefaultValue').disable();
            this.configSearch.patchValue({
                DefaultValue: '',
            });
        }
    }

    acceptFormList(content) {
        if (this.listTitleTable.length === 0) {
            this.showErrorNull = true;
            this.cancelMessage();
        } else {
            // this.modalAcceptForm.show();
            this.modalService.open(content, { centered: true });
        }
    }

    openModalCancelWhenTabChange(content) {
        this.modalService.open(content, { centered: true });
    }

    openModalConfigSearch(content) {
        this.modalService.open(content, { centered: true });
    }

    cancelMessage() {
        setTimeout(() => {
            this.showErrorNull = false;
        }, 3000);
    }

    CancelAttrSearchBtn(content) {
        if (this.configSearch.pristine) {
            // this.modalConfigFieldSearch.hide();
            this.modalService.dismissAll();
        } else {
            // this.modalCancelAttrSearch.show();
            this.modalService.open(content, { centered: true });
        }
    }

    hover() {
        this.arrayAttributeDrop.forEach(item => {
            item.arr.forEach(item2 => {
                item2.active = false;
            });
        });
    }

}
