import { HttpErrorResponse } from '@angular/common/http';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';
import { ICredentials } from 'src/app/shared/model/credentials.model';
import { IUser } from 'src/app/shared/model/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  credentials?: ICredentials;
  token?: string;
  error?: HttpErrorResponse;
  account?: IUser;
  menu?: MainMenuItems[];
  tabs?: MainMenuItems[];
  tab?: string;
  tabArgs?: any;
  isChangePassword: any;
  isChange: boolean;
  change: any;
  changePassUser?: any;
  ressetPasswordFinish?: any;
  resetErr?: any;
  permission?: any;
    errorReset: any;
}

export interface AuthenticateResponse {
  token: string;
}
