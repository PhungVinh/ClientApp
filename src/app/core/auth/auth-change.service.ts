import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {selectIsAuthenticated, selectIsChange} from './auth.selectors';
import { AppState } from '../core.state';
import { map, tap } from 'rxjs/operators';
import {pipe} from "rxjs/Rx";
@Injectable({
    providedIn: 'root'
})
export class AuthChangeService implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(selectIsChange),
            map(change => change && change.mustChangePassword),
            tap(change => {
                console.log('change', change);
                if (change) {
                    if (change.mustChangePassword) {
                        console.log('change1');
                        this.router.navigate(['auth', 'login']);
                    }
                } else {
                    console.log('change2');
                    this.router.navigate(['auth', 'login']);
                }
            }),
        );
    }
}
