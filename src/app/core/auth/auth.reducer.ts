import {isDefined} from 'src/app/shared/util/common.util';
import {AuthActions, AuthActionTypes} from './auth.actions';
import {AuthState} from './auth.models';

export const initialState: AuthState = {
    isAuthenticated: false,
    loading: false,
    isChangePassword: null,
    isChange: null,
    change: null,
    changePassUser: null,
    ressetPasswordFinish: null,
    resetErr: null,
    errorReset: null,
    tabArgs: new Object(),
};

export function authReducer(
    state: AuthState = initialState,
    action: AuthActions
): AuthState {
    let oldTab: any[];
    let index: number;
    let args: any;
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                isAuthenticated: false,
                loading: false,
                credentials: null,
                token: null,
                error: null,
                account: null,
                menu: null,
                isChangePassword: null,
                isChange: null,
                change: null,
                changePassUser: null,
                errorReset: null
            };

        case AuthActionTypes.LOGOUT:
            return {
                isAuthenticated: false,
                loading: false,
                credentials: null,
                token: null,
                error: null,
                account: null,
                menu: null,
                isChangePassword: null,
                isChange: null,
                change: null,
                changePassUser: null,
                tabs: null,
                tab: null,
                errorReset: null
            };
        case AuthActionTypes.EXPIRED:
            return {
                isAuthenticated: false,
                loading: false,
                credentials: null,
                token: null,
                error: null,
                account: null,
                menu: null,
                isChangePassword: null,
                isChange: null,
                change: null,
                changePassUser: null,
                tabs: null,
                tab: null,
                errorReset: null
            };
        case AuthActionTypes.AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: false,
                loading: true,
                token: null,
                error: null,
                credentials: action.payload.credentials,
                tabs: null,
                tab: null
            };

        case AuthActionTypes.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                token: action.payload.token,
                error: null
            };

        case AuthActionTypes.AUTHENTICATE_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                error: action.payload.error
            };

        case AuthActionTypes.FETCH_ACCOUNT:
            return {
                ...state,
                loading: true,
                // account: null
            };

        case AuthActionTypes.FETCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                account: action.payload.account
            };

        case AuthActionTypes.FETCH_ACCOUNT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                account: null
            };

        case AuthActionTypes.FETCH_ACCOUNT_MENU:
            return {
                ...state,
                loading: true
            };

        case AuthActionTypes.FETCH_ACCOUNT_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menu: action.payload.menu
            };

        case AuthActionTypes.FETCH_ACCOUNT_MENU_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case AuthActionTypes.FETCH_ACOUNT_PERMISSON:
            return {
                ...state,
                loading: true
            };

        case AuthActionTypes.FETCH_ACOUNT_PERMISSON_SUCCESS:
            return {
                ...state,
                loading: false,
                permission: action.payload.permissions
            };

        case AuthActionTypes.FETCH_ACOUNT_PERMISSON_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };

        case AuthActionTypes.TAB_ADD_OR_ACTIVE:
            oldTab = Object.assign([], state.tabs);
            index = oldTab.findIndex(t => t.type === 'tab' && t.code === action.payload.tab.code);
            if (index === -1) {
                oldTab.push(action.payload.tab);
            }
            args = new Object();
            if (isDefined(state.tabArgs)) {
                args = Object.assign(args, ...state.tabArgs);
            }
            if (isDefined(action.payload.args) && action.payload.args instanceof Object) {
                args = Object.assign(args, action.payload.args);
            }
            return {
                ...state,
                tab: action.payload.tab.code,
                tabs: [...oldTab],
                tabArgs: args
            };

        case AuthActionTypes.TAB_REMOVE:
            oldTab = Object.assign([], state.tabs);
            index = oldTab.findIndex(t => t.type === 'tab' && t.code === action.payload.code);

            if (index !== -1) {
                oldTab.splice(index, 1);
            }

            const newActiveTab = oldTab.some(
                t => t.type === 'tab'
                    && t.code === state.tab
            ) ? state.tab : (oldTab.length > 1 ? oldTab[0].code : null);

            return {
                ...state,
                tab: newActiveTab,
                tabs: [...oldTab]
            };

        case AuthActionTypes.TAB_DESTROY_ARGS:
            args = new Object();
            if (isDefined(state.tabArgs)) {
                args = Object.assign(args, ...state.tabArgs);
            }
            if (isDefined(action.payload.args) && action.payload.args instanceof Object) {
                args = Object.assign(args, action.payload.args);
            }
            return {
                ...state,
                tabArgs: args
            };

        case AuthActionTypes.TAB_ACTIVE:
            return {
                ...state,
                tab: action.payload
            };

        case AuthActionTypes.CHANGE:
            return {
                ...state,
                change: action.payload
            };

        case AuthActionTypes.CHANGE_PASSWORD:
            return {
                ...state,
                isChangePassword: action.payload
            };

        case AuthActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isChange: action.payload.change
            };

        case AuthActionTypes.CHANGE_PASSWORD_FAILD:
            return {
                ...state,
                error: action.payload.err
            };

        case AuthActionTypes.CHANGE_PASSWORD_USER:
            return {
                ...state,
                changePassUser: null,
                error: null
            };

        case AuthActionTypes.CHANGE_PASSWORD_USER_SUCCESS:
            return {
                ...state,
                changePassUser: action.payload.change,
                error: null
            };

        case AuthActionTypes.CHANGE_PASSWORD_USER_FAILD:
            return {
                ...state,
                changePassUser: null,
                error: action.payload.err
            };

        case AuthActionTypes.CHECK_TOKEN_RESET:
            return {
                ...state,
                // ressetPasswordFinish: null
            };

        case AuthActionTypes.CHECK_TOKEN_RESET_SUCCESS:
            return {
                ...state,
                ressetPasswordFinish: action.payload.data
            };

        case AuthActionTypes.CHECK_TOKEN_RESET_FAILD:
            return {
                ...state,
                resetErr: action.payload.err,
            };

        case AuthActionTypes.RESET_PASSWORD_FINISH:
            return {
                ...state,
                errorReset: null,
            };

        case AuthActionTypes.RESET_PASSWORD_FINISH_FAILD:
            return {
                ...state,
                errorReset: action.payload.err,
            };
        case AuthActionTypes.UPDATEACCOUNTAVATAR:
            const newAccount = {...state.account, avatar: action.payload.avatar};
            return {
                ...state,
                account: newAccount,
            };
        default:
            return {...state};
    }
}
