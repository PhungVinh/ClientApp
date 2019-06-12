export interface Role {
    id: Number,
    index?: Number,
    authorityId: Number,
    menuCode: String,
    isEncypt?: Boolean,
    isShowAll?: Boolean,
    isEditAll?: Boolean,
    isDeleteAll?: Boolean,
    isShow?: Boolean,
    isAdd?: Boolean,
    isEdit?: Boolean,
    isDelete?: Boolean,
    isImport?: Boolean,
    isExport?: Boolean,
    isPrint?: Boolean,
    isApprove?: Boolean,
    isEnable?: Boolean,
    isPermission?: Boolean,
    isFirstExtend?: Boolean,
    isSecondExtend?: Boolean,
    isThirdExtend?: Boolean,
    isFouthExtend?: Boolean,
    menuName: String
}


export interface RoleDecorator {
    role?: Role,
    checkAll?: Boolean
}
