import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AUTH_TOKEN, AUTH_KEY, AUTH_ACCOUNT, AUTH_MENU, AUTH_TABS } from '../auth/auth.constants';
import { Store } from '@ngrx/store';
import { AppState } from '../core.state';
import { ActionAuthLogout } from '../auth/auth.actions';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(
    private localStorageService: LocalStorageService,
    // private store: Store<AppState>
    private injector: Injector,
    private toastyService: ToastyService
  ) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    console.log('ERROR: ', error);
    if (error instanceof HttpErrorResponse) {
      const errorResponse = (error as HttpErrorResponse);
      if (errorResponse.status === 401) {
        this.localStorageService.removeItem(AUTH_KEY);
        this.localStorageService.removeItem(AUTH_TOKEN);
        this.localStorageService.removeItem(AUTH_ACCOUNT);
        this.localStorageService.removeItem(AUTH_MENU);
        this.localStorageService.removeItem(AUTH_TABS);
        const store = this.injector.get(Store);
        store.dispatch(new ActionAuthLogout());
        return;
      }
      if (errorResponse.status === 0 || errorResponse.status >= 500) {
        let message = `Máy chủ xảy ra lỗi. Liên hệ quản trị viên để được hỗ trợ.`;
        switch (errorResponse.status) {
          case 0:
            message = `Không kết nối được đến máy chủ. Liên hệ quản trị viên để được hỗ trợ.`;
            break;
          case 500:
            message = `Máy chủ xảy ra lỗi. Liên hệ quản trị viên để được hỗ trợ.`;
            break;
          case 501:
            message = `Yêu cầu không được hỗ trợ từ máy chủ. Liên hệ quản trị viên để được hỗ trợ.`;
            break;
          case 502:
            message = `Máy chủ đang bảo trì hoặc xảy ra sự cố. Vui lòng thao tác lại sau.`;
            break;
          case 503:
            message = `Máy chủ không có sẵn hoặc đang bảo trì. Vui lòng thao tác lại sau.`;
            break;
          default:
            break;
        }
        const toastOptions: ToastOptions = {
          title: message,
          msg: undefined,
          showClose: false,
          timeout: 5000,
          theme: 'bootstrap',
          onAdd: (toast: ToastData) => {
            /* added */
          },
          onRemove: (toast: ToastData) => {
            /* removed */
          }
        };
        // Show toasty notification
        this.toastyService.error(toastOptions);
      }
    }
    super.handleError(error);
  }
}
