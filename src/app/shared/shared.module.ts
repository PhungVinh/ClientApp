import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from '@ngx-translate/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { ToastyModule } from 'ng2-toasty';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { TitleComponent } from '../layout/admin/title/title.component';
import { AccordionDirective } from './accordion/accordion.directive';
import { AccordionAnchorDirective } from './accordion/accordionanchor.directive';
import { AccordionLinkDirective } from './accordion/accordionlink.directive';
import { CardToggleDirective } from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import { ControlTrimDirective } from './directive/control-trim.directive';
import { ControlValueDirective } from './directive/control-value.directive';
import { HasAuthorityDirective } from './directive/has-authority.directive';
import { PatternOnlyDirective } from './directive/validation.directive';
import { DataFilterPipe } from './elements/data-filter.pipe';
import { ToggleFullScreenDirective } from "./fullscreen/toggle-fullscreen.directive";
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NgbDateCustomParserFormatter, NgbDateMomentAdapter } from './util/datepicker.util';
import { MatListModule } from '@angular/material/list';
import { DateValidator } from 'ng2-validation/dist/date';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ControlTrimReactiveFormDirective } from './directive/control-trim-reactive-form.directive';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,

    // 3rd party
    TranslateModule,
    FileUploadModule,

    ToastyModule.forRoot()
  ],
  exports: [
    NgbModule,
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    HttpClientModule,
    PerfectScrollbarModule,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    ClickOutsideModule,
    DataFilterPipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HasAuthorityDirective,
    PatternOnlyDirective,
    ToastyModule,
    ControlTrimDirective,
    ModalConfirmComponent,
    ControlValueDirective,
    MatListModule,
    DateValidator,
    CustomSelectComponent,
    FileUploadModule,
    ControlTrimReactiveFormDirective
  ],
  declarations: [
    ToggleFullScreenDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    CardToggleDirective,
    TitleComponent,
    CardComponent,
    ModalBasicComponent,
    ModalAnimationComponent,
    SpinnerComponent,
    DataFilterPipe,
    HasAuthorityDirective,
    PatternOnlyDirective,
    ControlTrimDirective,
    ModalConfirmComponent,
    ControlValueDirective,
    DateValidator,
    CustomSelectComponent,
    ControlTrimReactiveFormDirective
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
