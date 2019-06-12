import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionActiveTab, ActionRemoveTab } from 'src/app/core/auth/auth.actions';
import { selectActivedTab, selectTab } from 'src/app/core/auth/auth.selectors';
import { AppState } from 'src/app/core/core.state';
import { MainMenuItems } from 'src/app/shared/menu-items/menu-items';

@Component({
  selector: 'app-single-page-on',
  templateUrl: './single-page-on.component.html',
  styleUrls: ['./single-page-on.component.scss']
})
export class SinglePageOnComponent implements OnInit {
  private idCounter: number = 0;

  tabMenu$: Observable<MainMenuItems[]>;
  activedTab$: Observable<string>;


  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.tabMenu$ = this.store.pipe(select(selectTab));
    this.activedTab$ = this.store.pipe(select(selectActivedTab));
  }

  beforeChange = $event => {
    if ($event.nextId !== $event.active) {
      this.store.dispatch(new ActionActiveTab($event.nextId));
    }
    $event.preventDefault();
  }

  public onReloadClick(tab: any, $event): void {
    console.log('onReloadClick', tab);
    $event.preventDefault();
  }

  public onCloseClick(tab: any, $event): void {
    this.store.dispatch(new ActionRemoveTab(Object.assign({}, tab)));
    $event.preventDefault();
  }
}
