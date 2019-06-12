import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import { CustomerState } from '../reducers/customer.reducer';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { firstOrDefault } from 'src/app/shared/util/common.util';

/**
 * Select customer state from admin state
 */
export const selectCustomerState = createSelector(
  selectAdmin,
  (state: AdminState) => state.customerState
);

/**
 * Select customers from customer state
 */
export const selectCustomers = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customers
);

/**
 * select customer configuration for list screen from customer state
 */
export const selectCustomerConfiguration = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.data
);

/**
 * Select search configuration from customer configuration
 */
export const selectCustomerConfigurationSearch = createSelector(
  selectCustomerConfiguration,
  (state) => {
    // Pull origin data from state
    const searchFetchedConfiguration = <Array<any>>(state ? (state.search || []) : []);
    // Transform origin data to necessary typed data
    const searchConfiguration = <{ rowIndex: number; searchItems: any[] }[]>searchFetchedConfiguration.reduce((b: any[], a) => {
      const rowItem = b.find(s => s.rowIndex === a.RowIndex);
      if (rowItem) {
        rowItem.searchItems.push(a);
      } else {
        b.push({
          rowIndex: a.RowIndex,
          searchItems: [a]
        });
      };
      return b;
    }, []);
    // Sort necessary data items with wish order field
    searchConfiguration.forEach(row => row.searchItems.sort((b, a) => b.AttrOrder - a.AttrOrder));
    // Return finally disired data
    return searchConfiguration;
  }
);

/**
 * Select customer column configuration from customer configuration
 */
export const selectCustomerConfigurationColumn = createSelector(
  selectCustomerConfiguration,
  (state) => {
    const data = state ? (state.column || []) : []
    return data;
  }
);

/**
 * Select customer data of column configuration from customer configuration
 */
export const selectCustomerConfigurationColumnData = createSelector(
  selectCustomerConfiguration,
  (state) => state ? (state.data || []) : []
);

/**
 * Select pagination of customer data from customer configuration
 */
export const selectCustomerPagination = createSelector(
  selectCustomerConfiguration,
  (state) => firstOrDefault(<any[]>(state ? state.pagination : []), {
    TotalRecord: 0,
    CurrPage: 1,
    PageSize: ITEMS_PER_PAGE
  })
);

/**
 * Select form configuration
 */
export const selectFormConfiguration = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.formAttributes || []
);

/**
 * Select form configuration data
 */
export const selectFormConfigurationData = createSelector(
  selectCustomerState,
  (state: CustomerState) => firstOrDefault(<any[]>(state ? state.customer : []), null)
);

/**
 * Select update customer status
 */
export const selectUpdateCustomerStatus = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.load
);
