import { Action } from '@ngrx/store';

export enum CategoryActionTypes {
    LoadCategories = '[Category] Load Categories',
    LoadCategorySuccess = '[Category] Load Categories Success',
    LoadCategoryFail = '[Category] Load Categories Fail',
    LoadParentCategory = '[Category] Load parent category',
    LoadParentCategorySuccess = '[Category] Load parent category success',
    LoadParentCategoryFail = '[Category] Load parent category fail',
    LoadChildrenCategory = '[Category] Load children category',
    LoadChildrenCategorySuccess = '[Category] Load children category success',
    LoadChildrenCategoryFail = '[Category] Load children category fail',
    AddCategory = '[Category] Add category',
    AddCategorySuccess = '[Category] Add category success',
    AddCategoryFail = '[Categoty] Add category fail',
    GetCategoryEdit = '[Category] get category edit',
    DeleteCategory = '[Category] delete category',
    GetCategoryEditSuccess = '[Category] get category edit success',
    GetCategoryEditFail = '[Category] get category edit fail',
    DeleteCategoryFail = '[Category] delete category fail',
    DeleteCategorySuccess = '[Category] delete category success',
    UpdateCategory = '[Category] update category',
    UpdateCategorySuccess = '[Category] Update category success',
    UpdateCategoryFail = '[Category] Update category fail '

}


export class LoadCategories implements Action {
    readonly type = CategoryActionTypes.LoadCategories;
    constructor(readonly payload: { TextSearch: String, currPage: Number, recodperpage: Number }) {}
}

export class LoadCategorySuccess implements Action {
    readonly type = CategoryActionTypes.LoadCategorySuccess;
    constructor(readonly payload: { data: any, paging: any }) {}
}
export class LoadCategoryFail implements Action {
    readonly type = CategoryActionTypes.LoadCategoryFail;
    constructor(readonly payload: { err: any }) {};
}
export class LoadParentCategory implements Action {
    readonly type = CategoryActionTypes.LoadParentCategory
}

export class LoadParentCategorySuccess implements Action {
    readonly type = CategoryActionTypes.LoadParentCategorySuccess
    constructor(readonly payload: { data: any }) {}
}

export class LoadParentCategoryFail implements Action {
    readonly type = CategoryActionTypes.LoadParentCategoryFail;
    constructor(readonly payload: { err: any }) {};
}

export class LoadChildrenCategory implements Action {
    readonly type = CategoryActionTypes.LoadChildrenCategory
}

export class LoadChildrenCategorySuccess implements Action {
    readonly type = CategoryActionTypes.LoadChildrenCategorySuccess;
    constructor(readonly payload: { data: any }) {}
}

export class LoadChildrenCategoryFail implements Action {
    readonly type = CategoryActionTypes.LoadChildrenCategoryFail;
    constructor(readonly payload: { err: any }) {}
}

export class AddCategory implements Action {
    readonly type = CategoryActionTypes.AddCategory;
    constructor(readonly payload: { body: any }) {}
}
export class AddCategoryFail implements Action {
    readonly type = CategoryActionTypes.AddCategoryFail;
    constructor(readonly payload: { err: any }) {};
}
export class AddCategorySuccess implements Action {
    readonly type = CategoryActionTypes.AddCategorySuccess;
}

export class GetCategoryEdit implements Action {
    readonly type = CategoryActionTypes.GetCategoryEdit;
    constructor(readonly payload: { CategoryCode: string }) {}
}

export class GetCategoryEditSuccess implements Action {
    readonly type = CategoryActionTypes.GetCategoryEditSuccess;
    constructor(readonly payload: { data: string }) {}
}

export class GetCategoryEditFail implements Action {
    readonly type = CategoryActionTypes.GetCategoryEditFail;
    constructor(readonly payload: { err: any }) {};
}

export class DeleteCategory implements Action {
    readonly type = CategoryActionTypes.DeleteCategory;
    constructor(readonly payload: { CategoryCode: String }) { }
}

export class DeleteCategorySuccess implements Action {
    readonly type = CategoryActionTypes.DeleteCategorySuccess;
    constructor(readonly payload: { category: any }) { }
}

export class DeleteCategoryFail implements Action {
    readonly type = CategoryActionTypes.DeleteCategoryFail;
    constructor(readonly payload: { error: any }) { }
}

export class UpdateCategory implements Action {
    readonly type = CategoryActionTypes.UpdateCategory;
    constructor(readonly payload: { category: any }) { }
}

export class UpdateCategorySuccess implements Action {
    readonly type = CategoryActionTypes.UpdateCategorySuccess;
}

export class UpdateCategoryFail implements Action {
    readonly type = CategoryActionTypes.UpdateCategoryFail;
    constructor(readonly payload: { err: any }) {};
}
export type CategoryActions = LoadCategories 
 | LoadCategorySuccess
 | LoadCategoryFail
| LoadParentCategory
| LoadParentCategorySuccess
| LoadParentCategoryFail
| LoadChildrenCategory
| LoadChildrenCategorySuccess
| LoadChildrenCategoryFail
| AddCategory
| AddCategorySuccess
| AddCategoryFail
| GetCategoryEdit
| GetCategoryEditSuccess
| GetCategoryEditFail
| DeleteCategory
| DeleteCategoryFail
| DeleteCategorySuccess
| UpdateCategory
| UpdateCategorySuccess
| UpdateCategoryFail


