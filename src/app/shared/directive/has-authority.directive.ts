import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getPermissionCurrentUser, getCurrentUser } from 'src/app/core/auth/auth.selectors';
import { AUTH_TOKEN } from 'src/app/core/auth/auth.constants';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import jwtDecode from 'jwt-decode';
@Directive({
  selector: '[hasAuthority]'
})
export class HasAuthorityDirective implements OnInit {

  @Input() hasAuthority: any;
  @Input() menuCode;
  @Input() createBy;
  @Input() feature: String;
  @Input() onlyShow: boolean;

  permissons$;
  currentUser$;
  permissions;
  currentUser;
  private roleLogin: String;
  constructor(
    private el: ElementRef,
    private store: Store<any>,
    private localStorage: LocalStorageService
    ) {
  }

  ngOnInit() {
    const a = this.localStorage.getItem(AUTH_TOKEN);
    var decodedToken = jwtDecode(a);
    this.roleLogin = decodedToken.Role;
    this.permissons$ = this.store.pipe(select(getPermissionCurrentUser));
    this.permissons$.subscribe((permissions) => {
      if (permissions) {
        this.permissions = permissions
      }
    });
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
    this.currentUser$.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
    if (this.permissions && this.currentUser) {
      this.checkPermissonAccessPolicy();
    } else {
      this.checkPermissonAccessPolicy();
    }
  }

  checkPermissonAccessPolicy() {
  
    let isShowFeature = true;
    if (this.hasAuthority.includes(",")) {
      this.hasAuthority = this.hasAuthority.split(',');
    } else {
      this.hasAuthority = [this.hasAuthority];
    }
    const isHaveRole = this.hasAuthority.some(role => role === this.roleLogin);
    if (!isHaveRole) {
      return this.show(false);
    }
    if (this.roleLogin === "SuperAdmin" || this.roleLogin === 'Admin') {
      return this.show(true);
    }
    // if Assignee
    const authority= this.permissions.find((authority) => authority.menuCode === this.menuCode);
    if (!authority) {
      isShowFeature = false;
    } else {
      switch(this.feature) {
        case "show":
          if(this.onlyShow) {
            isShowFeature = authority.isShowAll || authority.isShow;
          } else {
            isShowFeature = authority.isShowAll || (authority.isShow && (this.currentUser === this.createBy));
          }
        break;
        case "edit":
        isShowFeature = authority.isEditAll || (authority.isEdit && (this.currentUser === this.createBy));
        break;
        case "delete":
        isShowFeature = authority.isDeleteAll || (authority.isDelete && (this.currentUser === this.createBy));
        break;
        case "add":
        isShowFeature = authority.isAdd;
        break;
        default:
        return isShowFeature;
      }
    }
    
    this.show(isShowFeature);
  }
  private show(flag) {
    if (!flag) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}
