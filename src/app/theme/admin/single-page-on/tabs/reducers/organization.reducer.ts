import {
    OrganizationActions,
    OrganizationActionTypes,
    OrganizationsInforUpdate,
    OrganizationsInforUpdateFaild
} from '../actions/organization.actions';
import { Pagination } from '../../../../../shared/model/pagination.model';


export interface OrganizationState {
    organizations?: any;
    pagination?: Pagination;
    load?: boolean;
    err?: any;
    param?: any;
    infoOrg?: any;
    categoryAll?: any;
    linkImage?: any;
    servicePack?: any;
    errOrg?: any;
    errInforOrg?: any;
}

export const initialState: OrganizationState = {
    // organizations: any,
    // pagination: Pagination,
    // err: any,
};

export function organizationReducer(state = initialState, action: OrganizationActions): OrganizationState {
    switch (action.type) {

        case OrganizationActionTypes.LoadOrganizations:
            console.log('action.payload.pagination', action.payload.pagination);
            return {
                ...state,
                param: action.payload.pagination
            };
        case OrganizationActionTypes.LoadOrganizationsSuccess:
            return {
                ...state,
                organizations: action.payload.data,
                // pagination: action.payload.pagination,
            };
        case OrganizationActionTypes.LoadOrganizationsFaild:
            return {
                ...state,
                err: action.payload.err
            };
        case OrganizationActionTypes.OrganizationsCreate:
            return {
                ...state,
                load: false,
                errOrg: null,
            };
        case OrganizationActionTypes.OrganizationsUpdate:
            return {
                ...state,
                load: false,
                errOrg: null
            };
        case OrganizationActionTypes.OrganizationsUpdateSuccess:
            return {
                ...state,
                load: action.payload.data,
                // pagination: action.payload.pagination,
            };
        case OrganizationActionTypes.OrganizationsUpdateFaild:
            return {
                ...state,
                errOrg: action.payload.err
            };
        case OrganizationActionTypes.OrganizationsUploadFile:
            return {
                ...state
            };
        case OrganizationActionTypes.OrganizationsUploadFileSuccess:
            return {
                ...state,
                load: action.payload.load
            };
        case OrganizationActionTypes.OrganizationsUploadFileFaild:
            return {
                ...state,
                err: action.payload.err
            };
        case OrganizationActionTypes.LoadInforOrganizationsSuccess:
            return {
                ...state,
                infoOrg: action.payload.data
            };
        case OrganizationActionTypes.LoadInforOrganizationsErr:
            return {
                ...state,
                err: action.payload.err
            };
        case OrganizationActionTypes.LoadAllCategorySuccess:
            return {
                ...state,
                categoryAll: action.payload.data
            };
        case OrganizationActionTypes.GetLinkImageSuccess:
            return {
                ...state,
                linkImage: action.payload.data
            };
        // case OrganizationActionTypes.OrganizationsServicePack:
        //     return {
        //         ...state,
        //         servicePack: null
        //     };
        case OrganizationActionTypes.OrganizationsServicePackSuccess:
            return {
                ...state,
                servicePack: action.payload.data
            };
        case OrganizationActionTypes.OrganizationsInforUpdate:
            return {
                ...state,
                errInforOrg: null
            };
        case OrganizationActionTypes.OrganizationsInforUpdateFaild:
            return {
                ...state,
                errInforOrg: action.payload.err
            };
        default:
            return state;
    }
}
