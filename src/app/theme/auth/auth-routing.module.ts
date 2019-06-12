import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthChangeService} from "../../core/auth/auth-change.service";
import {AuthGuardService} from "../../core/auth/auth-guard.service";
import {ResetPasswordFinishComponent} from "./reset-password-finish/reset-password-finish.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
      {
          path: 'change-password',
          component: ResetPasswordComponent,
          canActivate: [AuthChangeService]
      },
      {
          path: 'reset-password-finish',
          component: ResetPasswordFinishComponent
      },
      {
        path: 'registration',
        loadChildren: './registration/registration.module#RegistrationModule'
      },
      {
        path: 'forgot',
        loadChildren: './forgot/forgot.module#ForgotModule'
      },
      {
        path: 'lock-screen',
        loadChildren: './lock-screen/lock-screen.module#LockScreenModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
