import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordFinishComponent } from './reset-password-finish/reset-password-finish.component';
// import { ChangePasswordFinishComponent } from './change-password-finish/change-password-finish.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [ResetPasswordComponent, ResetPasswordFinishComponent]
})
export class AuthModule { }
