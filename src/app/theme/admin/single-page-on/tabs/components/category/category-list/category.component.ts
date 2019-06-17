import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store, select } from '@ngrx/store';
import { LoadCategories, LoadParentCategory, LoadChildrenCategory, GetCategoryEdit, DeleteCategory } from '../../../actions/category.actions';
import { selectCategory, selectErrorCategory } from '../../../selectors/category.selector';
import { PER_PAGE } from 'src/app/shared/constants/authority.constants';
import { FormControl } from '@angular/forms';
import { ModalConfirmComponent } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { moduleDef } from '@angular/core/src/view';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$;
  paging$
  categories;
  public perPage = PER_PAGE;
  public page;
  public searchInput: FormControl;
  @ViewChild('modalConfirm') modalConfirm: ModalConfirmComponent;
  @ViewChild('modalIgnore') modalIgnore: ModalConfirmComponent;
  constructor(
    private store: Store<any>,
    private modalService: NgbModal,) { }

  ngOnInit() {
    this.searchInput = new FormControl('');
    const searchInput = this.searchInput.value.trim();
    this.store.dispatch(new LoadCategories({TextSearch: searchInput, currPage: 1, recodperpage: 10}));
    this.categories$ = this.store.pipe(select(state => state.admin.category.categories));
    this.paging$ = this.store.pipe(select(state => state.admin.category.reqOption));
    this.paging$.subscribe(p => {
      this.page = p.currPage;
    });
  }

  addCategory() {
    this.store.dispatch(new LoadParentCategory());
    this.store.dispatch(new LoadChildrenCategory());
    this.modalService.open(CategoryFormComponent as Component, { size: 'lg', backdrop: 'static', container: '.tab-category' });
  }

  editCategory(categoryCode) {
    this.store.dispatch(new GetCategoryEdit({CategoryCode: categoryCode}));
    this.store.dispatch(new LoadParentCategory());
    this.store.dispatch(new LoadChildrenCategory());
    const modalRef = this.modalService.open(CategoryFormComponent as Component, { size: 'lg', backdrop: 'static', container: '.tab-category' });
    modalRef.componentInstance.formType = 'edit';
  }

  search() {
    const searchInput = this.searchInput.value.trim();
    console.log('this.perPage', this.perPage, searchInput);
    this.store.dispatch(new LoadCategories({ TextSearch: searchInput, currPage: 1, recodperpage: this.perPage }));
  }

  loadPage(page) {
    this.store.dispatch(new LoadCategories({ TextSearch: '', currPage: page, recodperpage: this.perPage }));
  }

  deleteCategory(id: number) {
    this.modalConfirm.showReference(id);
  }
  onAcceptedDelete(CategoryCode) {
    this.store.dispatch(new DeleteCategory({ CategoryCode }));
    this.store.pipe(select(selectErrorCategory)).subscribe((err) => {
      if (err && err.errorKey === 'CategoryUsing') {
        this.modalIgnore.showReference();
      }
    })
  }
  
}
