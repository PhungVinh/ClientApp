import { CategoryActionTypes, CategoryActions } from "../actions/category.actions";

export interface CategoryState {
    categories: any;
    categoryParent: any;
    categoryChildren: any;
    categoryEdit: any;
    reqOption: RequestOptions;
    loading?: boolean;
    err?: any;
}

export interface RequestOptions {
    query?: {
        textSearch?: String;
    }
    sort?: string;
    currPage?: number;
    pageSize?: number;
    totalPage?: number;
}

export const initialState: CategoryState = {
    categories: [],
    categoryParent: [],
    categoryChildren: [],
    categoryEdit: {},
    reqOption: {
        query: {
            textSearch: ''
        },
        currPage: 1,
        pageSize: 10
    },
    loading: false,
    err: false
};
export function categoryReducer(state = initialState, action: CategoryActions): CategoryState {
    switch (action.type) {
        case CategoryActionTypes.LoadCategories:
            console.log('LoadCategories action.payload', action.payload, state.reqOption);
            return {
                ...state,
                reqOption: {
                    ...state.reqOption,
                    query: {
                        textSearch: action.payload.TextSearch
                    },
                    pageSize: 10
                }
            }
        case CategoryActionTypes.LoadCategorySuccess:
            console.log('LoadCategorySuccess action.payload', action.payload);
            return {
                ...state,
                categories: action.payload.data,
                loading: false,
                reqOption: {
                    ...state.reqOption,
                    currPage: action.payload.paging[0].currPage,
                    pageSize: action.payload.paging[0].pageSize,
                    totalPage: action.payload.paging[0].totalPage
                }
            }

        case CategoryActionTypes.LoadCategoryFail:
            return {
                ...state,
                err: action.payload.err
            }
        case CategoryActionTypes.LoadParentCategorySuccess:
            return {
                ...state,
                categoryParent: action.payload
            }

        case CategoryActionTypes.LoadParentCategoryFail:
            return {
                ...state,
                err: action.payload.err
            }

        case CategoryActionTypes.LoadChildrenCategorySuccess:
            return {
                ...state,
                categoryChildren: action.payload
            }

        case CategoryActionTypes.LoadChildrenCategoryFail:
            return {
                ...state,
                err: action.payload.err
            }
        case CategoryActionTypes.AddCategory:
            return {
                ...state,
                err: null,
                loading: true
            }
        case CategoryActionTypes.AddCategorySuccess:
            return {
                ...state,
                err: null,
                loading: false
            }

        case CategoryActionTypes.AddCategoryFail:
            return {
                ...state,
                err: action.payload.err
            }
        case CategoryActionTypes.GetCategoryEditSuccess:
            return {
                ...state,
                categoryEdit: action.payload
            }
        case CategoryActionTypes.GetCategoryEditFail:
            return {
                ...state,
                err: action.payload.err
            }
        case CategoryActionTypes.UpdateCategory:
            return {
                ...state,
                loading: true
            }
        case CategoryActionTypes.UpdateCategorySuccess:
            return {
                ...state,
                categoryEdit: {},
                loading: false
            }

        case CategoryActionTypes.UpdateCategoryFail:
            return {
                ...state,
                err: action.payload.err
            }
        case CategoryActionTypes.DeleteCategory:
            return {
                ...state,
                err: null
            }
        case CategoryActionTypes.DeleteCategorySuccess:
            return {
                ...state
            }
        case CategoryActionTypes.DeleteCategoryFail:
            return {
                ...state,
                err: action.payload.error
            }
        default:
            return state;
    }
}