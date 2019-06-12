import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    API_ACCOUNT_LOGIN,
    API_ACCOUNT_GET_USER,
    API_ACCOUNT_GET_MENU_LIST,
    API_CHANGE_PASSWORD, API_ACCOUNT_LOGOUT, API_CHANGE_PASSWORD_USER, API_RESET_PASSWORD_FINISH,
    API_GET_LIST_PERMISSON
} from 'src/app/app.constant';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { ICredentials } from 'src/app/shared/model/credentials.model';
import { IUser } from 'src/app/shared/model/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import {AUTH_KEY, AUTH_REMEMBER, AUTH_TOKEN} from './auth.constants';
import { isDefined, parseJwt } from 'src/app/shared/util/common.util';
import { Store } from '@ngrx/store';
import { ActionAuthLogout } from './auth.actions';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    protected localStorageService: LocalStorageService,
    private injector: Injector
  ) { }

  authenticate(credentials: ICredentials): Observable<any> {
    // let param = {
    //   email: `${credentials.username}@huudai.com`,
    //   password: `${credentials.password}@niwa`,
    //   rememberMe: credentials.rememberMe
    // };
    return this.httpClient
      .post(`${environment.serverApi}/${API_ACCOUNT_LOGIN}`, credentials, { observe: 'response' })
      .pipe(map(authenticateSuccess.bind(this)));

    function authenticateSuccess(resp) {
      const bearerToken = resp.body.token;
      let jwt = bearerToken;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        jwt = bearerToken.slice(7, bearerToken.length);
      }
      console.log('service auth', resp, credentials);
      if (resp.body.mustChangePassword) {
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      } else {
        if (credentials.rememberMe === true) {
            this.localStorageService.setItem(AUTH_REMEMBER, credentials);
        } else {
            this.localStorageService.removeItem(AUTH_REMEMBER);
        }
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
      }
      this.localStorageService.setItem(AUTH_TOKEN, jwt);
      // const countDown = setInterval(() => {
      //   console.log('countdount: ', parseJwt(jwt).exp * 1000 - Date.now());
      // }, 1000);
      setTimeout(() => {
        this.injector.get(Store).dispatch(new ActionAuthLogout());
        // clearInterval(countDown);
      }, parseJwt(jwt).exp * 1000 - Date.now());
      return resp.body;
    }
  }

  fetch(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.serverApi}/${API_ACCOUNT_GET_USER}`);
  }

  fetchMenu(): Observable<MainMenuItems[]> {
    return this.httpClient.get<MainMenuItems[]>(`${environment.serverApi}/${API_ACCOUNT_GET_MENU_LIST}`);
  }

  fetchPermission(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.serverApi}/Account/GetListPermission`);
  }

  changePassword(req: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.serverApi}/${API_CHANGE_PASSWORD}`, req);
  }
  logout(jwt?: string): Observable<any> {
    // return this.httpClient.delete<any>(`${environment.serverApi}/${API_ACCOUNT_LOGOUT}`);
    if (!isDefined(jwt)) {
      jwt = this.localStorageService.getItem(AUTH_TOKEN);
    }
    if (isDefined(jwt) && parseJwt(jwt).exp * 1000 - Date.now() > 0) {
      return this.httpClient.delete<any>(`${environment.serverApi}/${API_ACCOUNT_LOGOUT}`, {
        headers: {
          Authorization: 'Bearer ' + jwt
        }
      });
    }
    return of(false);
  }

  changePasswordUser(req: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.serverApi}/${API_CHANGE_PASSWORD_USER}`, req);
  }

  resetPasswordFinsih(req: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.serverApi}/${API_RESET_PASSWORD_FINISH}`, { params: req });
  }

  getListPermision(): Observable<any> {
    return this.httpClient.get<any>(`${environment.serverApi}/${API_GET_LIST_PERMISSON}`);
  }
}
