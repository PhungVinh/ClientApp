import { createSelector } from '@ngrx/store';
import { AdminState, selectAdmin } from '../../../admin.state';
import * as moment from 'moment';

export const getAuthority = createSelector(
  selectAdmin,
  (state: AdminState) => {
      const authorities = state.authority.authorities.map(author => {
        return { ...author, createDate: author.createDate && moment(author.createDate).format("DD/MM/YYYY") || '' };
      });
      return authorities ;
    },
);

export const getLoading = createSelector(
  selectAdmin,
  (state: AdminState) => {
    return state.authority.loading
  }
)

export const selectPaging = createSelector(
  selectAdmin,
  (state: AdminState) => {
    return state.authority.reqOption
  }
)


export const getAllAuthority = createSelector(
  selectAdmin,
  (state: AdminState) => {
    const authorities = state.authority.allAuthority.map(author => {
      return { 
        authorityId: author.authorityId,
        authorityName: author.authorityName
      }
    });
    return authorities;
  }
)


export const getAllRole = createSelector(
  selectAdmin,
  (state: AdminState) => {
    return state.authority.roles;
  }
)

export const getAuthorityInfo = createSelector(
    selectAdmin,
    (state: AdminState) => {
        return state.authority.authorityInfo;
    }
);

export const getErrorAuthority = createSelector(
  selectAdmin,
  (state: AdminState) => state.authority.err
)