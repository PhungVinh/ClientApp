import { Moment } from 'moment';
export interface Authority {
    authorityId?: Number,
    authorityName: String,
    authorityType?: String,
    authorityDescription?: String,
    organizationId?: Number,
    createBy?: String,
    createDate?: Moment,
    updateBy?: Moment,
    updateDate?: Moment,
    isDelete?: Boolean,
    isLock?: Boolean
}
