import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { AddCategory, UpdateCategory } from '../../../actions/category.actions';
import { selectErrorCategory } from '../../../selectors/category.selector';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import * as _ from 'lodash';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  public fileName = "";
  public categoryForm: FormGroup;
  public search: FormControl;
  public listParent: any;
  public listChild: any;
  public title: String;
  categoryParent$: any;
  categoryChildren$: any;
  categoryEdit$: any;
  categoryEdit: any;
  load$;
  deleteCategory: any = [];
  private oldForm: any;
  readonly errorMsgs = {
    categoryName: ''
  };
  private txtSearch: String = '';
  validationMessages = {
    'CategoryName': {
      'required': 'Thông tin không được để trống'
    }
  };
  @Input() formType: String
  @ViewChild('modalDefault') modalDefault: ModalConfirmComponent;
  @ViewChild('modalIgnore') modalIgnore: ModalConfirmComponent;
  @ViewChild('categoryNameInput') categoryNameInput: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public store: Store<any>
  ) { }

  ngOnInit() {
    this.title = this.formType === 'edit' ? "Sửa danh mục" : "Thêm mới danh mục";
    this.categoryParent$ = this.store.pipe(select(state => {
      return state.admin.category.categoryParent;
    }));
    this.categoryEdit$ = this.store.pipe(select(state => {
      return state.admin.category.categoryEdit
    }));

    this.load$ = this.store.pipe(select(state => state.admin.category.loading));
    this.search = new FormControl('');
    this.categoryForm = this._formBuilder.group({
      CategoryDescription: [''],
      CategoryName: ['', Validators.required],
      CategoryTypeCode: [''],
      children: this._formBuilder.array([
        this.addChildrenFormGroup()
      ])
    });
    this.oldForm = this.categoryForm.value;
    this.categoryParent.valueChanges.pipe(distinctUntilChanged()).subscribe((CategoryCode) => {;
      if (CategoryCode) {
        this.categoryChildren$ = this.store.pipe(select(state => {
          return state.admin.category.categoryChildren.filter(cate => cate.CategoryTypeCode === CategoryCode);
        }));
      }
    })
    this.getCategory();
    this.validateForm();
    this.categoryName.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
      this.validateForm();
    });
  }

  validateFormArray() {
    this.children['controls'].forEach((child, index) => {
      child.get('CategoryName').markAsDirty();
      child.get('CategoryName').markAsTouched();
      const formArray = this.children.controls[index] as FormArray;
      const listChilren = this.children.value.map((value) => {
        return {
          ExtContent: value.ExtContent,
          CategoryName: value.CategoryName.toLowerCase()
        };
      });
      const currentChild = {
        ExtContent: this.children.controls[index].value.ExtContent,
        CategoryName: this.children.controls[index].value.CategoryName.toLowerCase()
      };
      const numberChildDuplicate = listChilren.filter(value => {
        return _.isEqual(value, currentChild);
      });
      if (formArray.controls['CategoryName'].value.trim() && numberChildDuplicate.length >= 2) {
        formArray.controls['CategoryName'].setErrors({ notUnique: true });
      } else {
        formArray.controls['CategoryName'].setErrors({ notUnique: false });
        formArray.controls['CategoryName'].updateValueAndValidity();
      }
    });
  }
  validateForm() {
    if (this.categoryName.hasError('required')) {
      if (this.categoryName.dirty || this.categoryName.touched) {
        this.categoryNameInput.nativeElement.focus();
      }
      this.errorMsgs.categoryName = "Thông tin không được để trống";
    } else {
      this.errorMsgs.categoryName = "";
    }
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  openClose() {
    const compareForm = _.isEqual(this.oldForm, this.categoryForm.value);
    if (this.categoryForm.pristine || compareForm) {
      this.clear();
    } else {
      this.modalDefault.showReference();
    }
  }
  agreeComfirm($event) {
    this.modalDefault.hide();
    this.clear();
  }
  choooseFile(e) {
    this.fileName = e.target.files[0].name;
  }

  getCategory() {
    this.categoryEdit$.subscribe((cate) => {
      this.categoryEdit = cate;
      if (this.formType === 'edit' && Object.keys(cate).length !== 0) {
        this.editCategory(cate)
      }
    }
    );
  }
  editCategory(category) {
    this.categoryForm.patchValue({
      CategoryDescription: category.categoryDescription,
      CategoryName: category.categoryName,
      CategoryTypeCode: category.categoryTypeCode
    });
    this.categoryForm.setControl('children', this.setExistingChildren(category.children));
    this.oldForm = this.categoryForm.value;
  }

  setExistingChildren(categorySets): FormArray {
    const formArray = new FormArray([]);
    categorySets.forEach(c => {
      formArray.push(this._formBuilder.group({
        CategoryTypeCode: c.categoryTypeCode,
        CategoryName: c.categoryName,
        CategoryCode: c.categoryCode,
        ExtContent: c.extContent,
        IsCheck: c.isCheck
      }));
    });
    return formArray;
  }

  validateDuplicateName() {
    this.store.select(selectErrorCategory).subscribe((errors) => {
      if (errors) {
        if (errors.errorKey && errors.errorKey.endsWith('titleexists')) {
          this.categoryName.setErrors({ notUnique: true });
          if (this.categoryName.hasError('notUnique')) {
            this.errorMsgs.categoryName = "Thông tin đã tồn tại trên hệ thống";
            this.categoryNameInput.nativeElement.focus();
          } else {
            this.errorMsgs.categoryName = "";
          }
        }
      }
    });
  }

  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } else {
        abstractControl.markAsDirty();
      }
    })
  }

  onSubmit() {
    this.validateFormArray();
    if (this.categoryForm.invalid) {
      console.log('invalid form', this.categoryForm);
      this.categoryName.markAsTouched();
      this.validateForm();
    } else {
      console.log('valid form');
      if (this.formType !== 'edit') {
        this.save();
      } else {
        this.edit();
      }
      this.validateDuplicateName();
    }
  }

  save() {
    const { CategoryDescription, CategoryName, CategoryTypeCode } = this.categoryForm.value;
    const children = this.categoryForm.value.children.map((value) => {
      return {
        CategoryName: value.CategoryName,
        CategoryTypeCode: value.ExtContent
      }
    });
    const body = {
      CategoryDescription: CategoryDescription,
      CategoryName: CategoryName,
      CategoryTypeCode: CategoryTypeCode,
      children: [...children]
    };
    this.store.dispatch(new AddCategory({ body: body }));
    this.load$.subscribe(load => {
      if (!load) {
        this.clear();
      }
    });
  }

  edit() {
    const { CategoryDescription, CategoryName, CategoryTypeCode } = this.categoryForm.value;
    const children = this.categoryForm.value.children.map((value) => {
      return {
        CategoryCode: value.CategoryCode,
        CategoryName: value.CategoryName,
        CategoryTypeCode: value.ExtContent,
      }
    });
    const body = {
      CategoryCode: this.categoryEdit.categoryCode,
      CategoryDescription: CategoryDescription,
      CategoryName: CategoryName,
      CategoryTypeCode: CategoryTypeCode,
      children: [...children],
      deleteCategory: this.deleteCategory
    };
    this.store.dispatch(new UpdateCategory({ category: body }))
    this.load$.subscribe(load => {
      if (!load) {
        this.clear();
      }
    });

  }

  addChildrenButtonClick(): void {
    (<FormArray>this.children).push(this.addChildrenFormGroup());
  }

  removeChildrenButtonClick(childrenGroupIndex: number, categoryCode: String, isCheck: Boolean): void {
    console.log('isCheck', isCheck);
    if (isCheck) {
      this.modalIgnore.showReference();
    } else {
      console.log(childrenGroupIndex);
      this.deleteCategory = [...this.deleteCategory, { CategoryCode: categoryCode }];
      const childrenFormArray = <FormArray>this.children;
      (<FormArray>this.children).removeAt(childrenGroupIndex);
      console.log(this.children);
      childrenFormArray.markAsDirty();
      childrenFormArray.markAsTouched();
    }
  }

  addChildrenFormGroup(): FormGroup {
    return this._formBuilder.group({
      CategoryTypeCode: [''],
      CategoryName: ['', Validators.required],
      CategoryCode: [''],
      ExtContent: [''],
      IsCheck: [false]
    });
  }

  onSearch() {
    this.txtSearch = this.search.value;
  }

  displayControlArray(i) {
    const formArray = this.children.controls[i] as FormArray;
    let display = formArray.controls['CategoryName'].value.toLowerCase().includes(this.txtSearch.toLowerCase());
    return !display;
  }
  get categoryParent() {
    return this.categoryForm.get('CategoryTypeCode');
  }

  get children() {
    return this.categoryForm.get('children') as FormArray;
  }

  get categoryName() {
    return this.categoryForm.get('CategoryName');
  }

}
