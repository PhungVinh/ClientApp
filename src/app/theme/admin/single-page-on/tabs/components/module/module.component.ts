import { Component, OnInit } from '@angular/core';
import { LoadModules } from '../../actions/module.actions';
import { select, Store } from '@ngrx/store';
import { selectModule } from '../../selectors/module.selector';
import { Observable } from 'rxjs';
import { ActionActiveTab, ActionAddOrActiveTab } from '../../../../../../core/auth/auth.actions';

@Component({
    selector: 'app-module',
    templateUrl: './module.component.html',
    styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

    public listModule$: Observable<any[]>;

    constructor(private store: Store<any>) { }

    public obj = {
        badge: null,
        children: [],
        code: 'ATTR_FORM',
        icon: null,
        mainState: 'ATTR',
        menuId: 12,
        name: 'Cấu hình Form',
        parentCode: 'ATTR',
        shortLabel: 'TK',
        state: null,
        target: null,
        type: 'tab'
    };

    ngOnInit() {
        this.store.dispatch(new LoadModules());
        this.listModule$ = this.store.pipe(select(selectModule));
    }

    openTab(tab) {
        console.log(tab);
        // this.store.dispatch(new ActionActiveTab('ATTR_FORM'));
        this.store.dispatch(new ActionAddOrActiveTab({ tab: this.obj }));
    }
}
