import {ModuleActions, ModuleActionTypes} from '../actions/module.actions';

export interface ModuleState {
    listModule?: any[];  // dm phai co dau hoi cham
}

export const initialState: ModuleState = {

};

export function moduleReducer(state = initialState, action: ModuleActions): ModuleState {
    switch (action.type) {

        // case ModuleActionTypes.LoadModules:
        //     return state;

        case ModuleActionTypes.LoadModulesSuccess:
            return {
                ...state,
                listModule: action.payload.listModule
            };
        default:
            return state;
    }
}
