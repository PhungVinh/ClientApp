import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  oldChild: any;
  validationMessages = {
    'CategoryName': {
      'required': 'Thông tin không được để trống'
    }
  };
  @Input() formType: String
  @ViewChild('modalDefault') modalDefault: ModalConfirmComponent;
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
    this.categoryParent.valueChanges.pipe(distinctUntilChanged()).subscribe((CategoryCode) => {
      console.log('CategoryCode', CategoryCode);
      if (CategoryCode) {
        // this.children['controls'].forEach(control => {
        //   control.enable();
        // })
        console.log('value ExtContent', this.categoryForm.get('children').value)
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


  validateForm() {
    if (this.categoryName.hasError('required')) {
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
      console.log('this.categoryEdit', this.categoryEdit)
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

    this.oldChild = this.children.value;
  }

  setExistingChildren(categorySets): FormArray {
    const formArray = new FormArray([]);
    categorySets.forEach(c => {
      formArray.push(this._formBuilder.group({
        CategoryTypeCode: c.categoryTypeCode,
        CategoryName: c.categoryName,
        CategoryCode: c.categoryCode,
        ExtContent: c.extContent
      }));
    });
    return formArray;
  }

  validateDuplicateName() {
    this.store.select(selectErrorCategory).subscribe((errors) => {
      console.log('errors', errors);
      if (errors) {
        if (errors.errorKey && errors.errorKey.endsWith('titleexists')) {
          this.categoryName.setErrors({ notUnique: true });
          if (this.categoryName.hasError('notUnique')) {
            this.errorMsgs.categoryName = "Thông tin đã tồn tại trên hệ thống";
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
    if (this.categoryForm.invalid) {
      this.categoryName.markAsTouched();
      this.validateForm();
    } else {
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
    const body =  {
      CategoryDescription: CategoryDescription,
      CategoryName: CategoryName,
      CategoryTypeCode: CategoryTypeCode,
      children: [ ...children]
    };
    this.store.dispatch(new AddCategory({body: body}));
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
    const body =  {
      CategoryCode: this.categoryEdit.categoryCode,
      CategoryDescription: CategoryDescription,
      CategoryName: CategoryName,
      CategoryTypeCode: CategoryTypeCode,
      children: [ ...children],
      deleteCategory: this.deleteCategory
    };
    console.log(body);
    // this.store.dispatch(new UpdateCategory({category: body}))
    // this.load$.subscribe(load => {
    //   if (!load) {
    //     this.clear();
    //   }
    // });

  }

  addChildrenButtonClick(): void {
    (<FormArray>this.children).push(this.addChildrenFormGroup());
    console.log('this.children.value', this.children.value);
    this.oldChild = this.children.value;
  }

  removeChildrenButtonClick(childrenGroupIndex: number, categoryCode: String): void {
    this.deleteCategory = [...this.deleteCategory, { CategoryCode: categoryCode }];
    const childrenFormArray = <FormArray>this.children;
    (<FormArray>this.children).removeAt(childrenGroupIndex);
    childrenFormArray.markAsDirty();
    childrenFormArray.markAsTouched();
    this.oldChild = this.children.value;
  }

  addChildrenFormGroup(): FormGroup {
    // if (this.categoryParent.value) {
    //   return this._formBuilder.group({
    //     CategoryTypeCode: [''],
    //     CategoryName: ['', Validators.required],
    //     CategoryCode: [''],
    //     ExtContent: [{ value: '' }]
    //   });
    // }
    return this._formBuilder.group({
      CategoryTypeCode: [''],
      CategoryName: ['', Validators.required],
      CategoryCode: [''],
      ExtContent: ['']
    });
  }

  onSearch() {
    const listChild = this.oldChild.filter((child) => {
      return child.CategoryName.includes((this.search.value));
    });
    console.log(this.oldChild);
    const formArray = new FormArray([]);
    listChild.forEach(c => {
      formArray.push(this._formBuilder.group({
        CategoryTypeCode: c.CategoryTypeCode,
        CategoryName: c.CategoryName,
        CategoryCode: c.CategoryCode,
        ExtContent: c.ExtContent
      }));
    });
    this.categoryForm.setControl('children', formArray);
  }
  get categoryParent() {
    return this.categoryForm.get('CategoryTypeCode');
  }

  get children() {
    return this.categoryForm.get('children');
  }

  get categoryName() {
    return this.categoryForm.get('CategoryName');
  }

}
