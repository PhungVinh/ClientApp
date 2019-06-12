import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';

export const selectAllAttr = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrState.listAttr
);

export const selectAllAttrFormList = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrState.listAttrFormList
);

export const selectFormConfig = createSelector(
    selectAdmin,
    (state: AdminState) => state.attrState.listAttrFormList
);

export const selectAttrFormListIsTableShow = createSelector(
    selectAdmin,
    (state: AdminState) => {
        let lstData = [];
        ((state.attrState.listAttr || [])).forEach(item => {
                if (item.IsTableShow) {
                    if (item.IndexTitleTable !== null) {
                        lstData[item.IndexTitleTable - 1] = item;
                    } else {
                        lstData.push(item);
                    }
                }
        });
        return lstData;
    }
);