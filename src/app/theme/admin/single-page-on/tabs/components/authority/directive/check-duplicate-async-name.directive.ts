import { Directive } from '@angular/core';
import { AuthorityService } from '../../../services/authority/authority.service';
import { AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/map';

@Directive({
  selector: '[appCheckDuplicateAsyncName]'
})
export class CheckDuplicateAsyncNameDirective {

  constructor() { }
  static createValidator(authorityService: AuthorityService, authorityId: Number = null) {
    return (control: AbstractControl) => {
      return authorityService.checkDuplicateAuthorityname(control.value, authorityId).map(res => {
        return !res.existed ? null : {existed: true};
      });
    }
  }
}
