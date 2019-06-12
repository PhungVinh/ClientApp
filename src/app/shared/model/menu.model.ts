// export interface IMenu {
//   Id?: string;
//   MenuName?: string;
//   Url?: string;
//   ParentId?: string;
//   OrderIndex?: number;
//   Icon?: string;
// }

// export class Menu implements IMenu {
//   constructor(
//     public Id?: string,
//     public MenuName?: string,
//     public Url?: string,
//     public ParentId?: string,
//     public OrderIndex?: number,
//     public Icon?: string,
//     public Childrens?: Menu[]
//   ) {}
// }

export interface IMenu {
  id?: number;
  name?: string;
  code?: string;
  route?: string;
  icon?: string;
  sequence?: number;
  parentId?: number;
}

export class Menu implements IMenu {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public route?: string,
    public icon?: string,
    public sequence?: number,
    public parentId?: number
  ) {}
}
