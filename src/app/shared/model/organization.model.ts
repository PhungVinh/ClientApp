import { Moment } from 'moment';

export interface IOrganization {
    organizationID?: number;
    organizationCode?: string;
    organizationParentCode?: string;
    organizationName?: string;
    organizationAddress?: string;
    organizationEmail?: string;
    organizationPhone?: string;
    organizationTaxCode?: string;
    organizationRemark?: string;
    organizationFrom?: string;
    isActive?: boolean;
    isLock?: boolean;
    isDelete?: boolean;
    organizationTo?: string;
    chkDelete?: boolean;
    organizationHomePage?: string;
    organizationLogo?: string;
    organizationNote?: string;
    organizationSphereID?: number;
}

export class Organization implements IOrganization {
  constructor(
     public organizationID?: number,
    public organizationCode?: string,
    public organizationParentCode?: string,
    public organizationName?: string,
    public organizationAddress?: string,
    public organizationEmail?: string,
    public organizationPhone?: string,
    public organizationTaxCode?: string,
    public organizationRemark?: string,
    public organizationFrom?: string,
    public isActive?: boolean,
    public isLock?: boolean,
    public isDelete?: boolean,
    public organizationTo?: string,
    public chkDelete?: boolean,
    public organizationHomePage?: string,
    public organizationLogo?: string,
    public organizationNote?: string,
    // public organizationSphereID?: number
  ) { }
}
export class OrganizationCriteria {
    constructor(
        public DateFrom?: any,
        public TextSearch ?: any,
        public IsActive ?: any,
    ) {}
}

