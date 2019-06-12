import { Moment } from 'moment';
export interface ICategoryPosition {
    id?: number;
    categoryCode?: string;
    categoryTypeCode?: string;
    categoryName?: string;
    createBy?: string;
    createDate?: Moment;
    updateBy?: string;
    updateDate?: Moment;
    isDelete?: boolean;
    isActive?: boolean;
    orderNum?: number;
}

export class CategoryPosition implements ICategoryPosition {
    constructor(
        public id?: number,
        public categoryCode?: string,
        public categoryTypeCode?: string,
        public categoryName?: string,
        public createBy?: string,
        public createDate?: Moment,
        public updateBy?: string,
        public updateDate?: Moment,
        public isDelete?: boolean,
        public isActive?: boolean,
        public orderNum?: number,
    ) { }
}

export class CategoryPositionCriteria{
    constructor(
        
    ){}
}