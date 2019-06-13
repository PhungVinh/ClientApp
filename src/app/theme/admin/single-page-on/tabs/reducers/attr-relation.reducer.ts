
import { AttrRelationActions, AttrRelationActionTypes } from '../actions/attr-relation.actions';
import { Pagination } from '../../../../../shared/model/pagination.model';

export interface AttrRelationState {
    listAttrRelation?: any;
    pagination?: Pagination;
    param?: any;
    errOrg?: any;
}

export const initialState: AttrRelationState = {

};

export function attrRelationReducer(state = initialState, action: AttrRelationActions): AttrRelationState {
    switch (action.type) {

        case AttrRelationActionTypes.LoadAttrRelations:
            return {
                ...state,
                param: action.payload.pagination

            };

        case AttrRelationActionTypes.LoadAttrRelationsSuccess:
            return {
                ...state,
                listAttrRelation: action.payload.data,
                // pagination: action.payload.pagination,
            };

        // case AttrRelationActionTypes.LoadAttrRelations:
        //   return state;

        case AttrRelationActionTypes.AddAttrRelationsSuccess:
            return {
                ...state,
            };

        case AttrRelationActionTypes.AddAttrRelationsFailed:
            return {
                ...state,
                errOrg: action.payload.err
            };

        case AttrRelationActionTypes.UpdateAttrRelationsSuccess:
            return {
                ...state,
            };

        case AttrRelationActionTypes.UpdateAttrRelationsFailed:
            return {
                ...state,
                errOrg: action.payload.err
            };

        // case AttrRelationActionTypes.DeleteAttrRelations:
        //     return {
        //         ...state,
        //     };


        case AttrRelationActionTypes.DeleteAttrRelationsSuccess:
            return {
                ...state,
            };

        default:
            return state;
    }
}
