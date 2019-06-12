
import { CategoryPositionActions, CategoryPositionActionTypes } from '../actions/category-position.actions';
import { ICategoryPosition } from 'src/app/shared/model/category-position.model';
import { Pagination } from '../../../../../shared/model/pagination.model';

export interface CategoryPositionState {
  categoryPosition?: ICategoryPosition[];
  pagination?: Pagination;
  load?: boolean;
  err?: any;
}

export const initialState: CategoryPositionState = {

};

export function categoryPositionReducer(state = initialState, action: CategoryPositionActions): CategoryPositionState {
  switch (action.type) {

    case CategoryPositionActionTypes.LoadCategoryPositions:
      return {
        ...state,
      };

    case CategoryPositionActionTypes.LoadCategoryPositionsSuccess:
      return {
        ...state,
        categoryPosition: action.payload.data,
      };

    case CategoryPositionActionTypes.LoadCategoryPositionsFaild:
      return {
        ...state,
        err: action.payload.err
      };
    default:
      return state;
  }
}
