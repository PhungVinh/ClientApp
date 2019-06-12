import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProfileService} from "../services/profile/profile.service";
import {catchError, map} from "rxjs/internal/operators";
import {exhaustMap, mergeMap} from "rxjs/operators";
import {of} from "rxjs/index";
import {
    GetImageProfiles,
    ProfileActionTypes, ProfilesUpdate, ProfilesUpdateFaild, ProfilesUpdateSuccess,
    UploadFileProfiles,
    UploadFileProfilesFaild,
    UploadFileProfilesSuccess
} from '../actions/profile.actions';
import {LoadOrganizations, OrganizationActionTypes, OrganizationsUpdateFaild} from "../actions/organization.actions";
import {ITEMS_PER_PAGE} from "../../../../../shared/constants/pagination.constants";
import {ActionFetchAccount, UpdateAccountAvarta} from '../../../../../core/auth/auth.actions';
import {AUTH_ACCOUNT, AUTH_CHANGE} from '../../../../../core/auth/auth.constants';
import {LocalStorageService} from '../../../../../core/local-storage/local-storage.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../core/core.state';



@Injectable()
export class ProfileEffects {



  constructor(
      private actions$: Actions,
      private profileService: ProfileService,
      private localStorageService: LocalStorageService,
      private store$: Store<AppState>
  ) {}
    // @Effect()
    // uploadFileProfile$ = this.actions$.pipe(
    //     ofType(ProfileActionTypes.UploadFileProfiles),
    //     exhaustMap((action: UploadFileProfiles) =>
    //         this.profileService.uploadFile(action.payload.file).pipe(
    //             mergeMap(data => [
    //                 new UploadFileProfilesSuccess({load: true }),
    //                 new GetImageProfiles({link: data})
    //             ]),
    //             catchError(err => of(new UploadFileProfilesFaild({ err })))
    //         )
    //     )
    // );
    @Effect()
    uploadFileProfile$ = this.actions$.pipe(
        ofType(ProfileActionTypes.UploadFileProfiles),
        exhaustMap((action: UploadFileProfiles) =>
            this.profileService.uploadFile(action.payload.file).pipe(
                mergeMap(data => {
                   const account = this.localStorageService.getItem(AUTH_ACCOUNT);
                   account.avatar = data.data;
                    this.localStorageService.setItem(AUTH_ACCOUNT, account);
                    this.store$.dispatch(new UpdateAccountAvarta({avatar: data.data}));
                    return [
                    new UploadFileProfilesSuccess({load: true })
                ];
                }),
                catchError(err => of(new UploadFileProfilesFaild({ err })))
            )
        )
    );
    @Effect()
    updateProfile$ = () =>
        this.actions$.pipe(
            ofType<ProfilesUpdate>(ProfileActionTypes.ProfilesUpdate),
            exhaustMap((action: ProfilesUpdate) =>
                this.profileService.updateProfile(action.payload.account).pipe(
                    mergeMap(data => [
                        new ProfilesUpdateSuccess({ load: true}),
                       new ActionFetchAccount()
                    ]),
                    catchError(err => of(new ProfilesUpdateFaild({ err })))
                )
            )
        );
}
