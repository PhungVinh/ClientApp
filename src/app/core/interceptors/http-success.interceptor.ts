import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isDefined } from 'src/app/shared/util/common.util';
import { environment } from '@env/environment';
import { API_ACCOUNT_LOGIN, API_ACCOUNT_LOGOUT, API_RESET_PASSWORD_FINISH, API_PROFILE_UPLOAD } from 'src/app/app.constant';
import { ToastOptions, ToastData, ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpSuccessInterceptor implements HttpInterceptor {
  private methodHandle: string[] = ['POST', 'PUT', 'PATCH', 'DELETE'];
  private ignoreApi: string[] = [API_ACCOUNT_LOGIN, API_ACCOUNT_LOGOUT, API_RESET_PASSWORD_FINISH];
  private updateExceptApi: string[] = [API_PROFILE_UPLOAD];
  constructor(
    private injector: Injector,
    private toastyService: ToastyService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((res: any) => {
        if (res instanceof HttpResponse && !(res instanceof HttpErrorResponse)) {
          if (isDefined(request.method) && this.methodHandle.some(x => x === request.method.toUpperCase())) {
            if (request.url.startsWith(environment.serverApi)) {
              const api = request.url.slice(environment.serverApi.length);
              if (!this.ignoreApi.some(x => api.toUpperCase().indexOf(x.toUpperCase()) !== -1)) {
                let message = 'Cập nhật thông tin thành công';
                const useResponseMessage = isDefined(res.body) && isDefined(res.body.message);
                if (useResponseMessage) {
                  message = res.body.message;
                  const translateService = this.injector.get(TranslateService);
                  message = translateService.instant(message);
                } else {
                  switch (request.method.toUpperCase()) {
                    case 'POST':
                      console.log('POST', api.toUpperCase(), this.updateExceptApi.some(x => api.toUpperCase().indexOf(x.toUpperCase()) === -1));
                      if (this.updateExceptApi.some(x => api.toUpperCase().indexOf(x.toUpperCase()) === -1)) {
                        message = 'Lưu thông tin thành công';
                      } else {
                        message = 'Cập nhật thông tin thành công';
                      }                      
                      break;
                    case 'PUT':
                      message = 'Cập nhật thông tin thành công';
                      break;
                    case 'PATCH':
                      message = 'Cập nhật thông tin thành công';
                      break;
                    case 'DELETE':
                      message = 'Xóa thông tin thành công';
                      break;
                  }
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
                this.toastyService.success(toastOptions);
              }
            }
          }
        }
      })
    );
  }
}
