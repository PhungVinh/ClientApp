import { Moment } from 'moment';

export interface IUser {
  id?: number;
  userName?: string;

  fullName?: string;
  email?: string;
  phoneNumber?: string;

  // creaateDate?: Moment;

  isLock?: boolean;

  address?: string;
  avatar?:string;

  position?: string;

  gender?: number;
  isGrantedAuthority?: boolean

  categoryCodeDepartment?: string;
  birthDay?: any;



}

export class User implements IUser {
  constructor(
    public id?: number,
    public userName?: string,

    public fullName?: string,
    public email?: string,
    public phoneNumber?: string,

    // public creaateDate?: Moment,

    public isLock?: boolean,

    public address?: string,

    public position?: string,

    public gender?: number,

    public categoryCodeDepartment?: string,
    public birthDay?: any,

  ) { }
}

export class UserCriteria {
  constructor(
    public DateFrom?: any,
    public TextSearch?: any,
    public fullName?: any,
    public email?: any,
    public phoneNumber?: any,
    public IsLock?: any,
  ) { }
}
