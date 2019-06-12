import { Moment } from 'moment';

export interface ICustomer {
  id?: number;
  username?: string;
  password?: string;
  name?: string;
  email?: string;
  email_verified_at?: Moment;
  address?: string;
  dateOfBirth?: Moment;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public name?: string,
    public email?: string,
    public email_verified_at?: Moment,
    public address?: string,
    public dateOfBirth?: Moment,
  ) { }
}
