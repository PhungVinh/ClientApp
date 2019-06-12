import { Moment } from 'moment';
export interface ICategoryDepartment {
    organizationID? : number;
    organizationCode?: string;
    organizationParentCode?: string;
    organizationName?: string;
    organizationAddress?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    organizationTaxCode?: string;
    organizationRemark?: string;
    organizationFrom?: string;
    createBy?: string;
    createDate?: Moment;
    updateBy?: string;
    updateDate?:Moment;
    isActive?: boolean;
    isLock? : boolean;
    isDelete? : boolean;
    organizationTo?: Moment;
    organizationHomePage?: string;
    organizationLogo?: string;
    organizationNote?: string;
    organizationSphereId?: number;
}

export class CategoryDepartment implements ICategoryDepartment {
    constructor(
        public organizationID? : number,
        public organizationCode?: string,
        public organizationParentCode?: string,
        public organizationName?: string,
        public organizationAddress?: string,
        public organizationEmail?: string,
        public organizationPhone?: string,
        public organizationTaxCode?: string,
        public organizationRemark?: string,
        public organizationFrom?: string,
        public createBy?: string,
        public createDate?: Moment,
        public updateBy?: string,
        public updateDate?:Moment,
        public isActive?: boolean,
        public isLock? : boolean,
        public isDelete? : boolean,
        public organizationTo?: Moment,
        public organizationHomePage?: string,
        public organizationLogo?: string,
        public organizationNote?: string,
        public organizationSphereId?: number,
    ) { }
}

export class CategoryDepartmentCriteria{
    constructor(
       
    ){}
}