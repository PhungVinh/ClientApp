import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  code: string;
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  code: string;
  state: string;
  shortLabel?: string;
  mainState?: string;
  target?: boolean;
  name: string;
  type?: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: []
  }
];


@Injectable()
export class MenuItems {

  constructor() {

  }

  getAll(): Menu[] {
    return MENUITEMS;
  }

}
