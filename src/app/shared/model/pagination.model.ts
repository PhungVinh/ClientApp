export interface Pagination {
    DateFrom?: string;
    DateTo?: string;
    TextSearch?: string;
    IsActive?: number;
    currPage?: number;
    recodperpage?: number;
    // searchUser
    orgCode?:string;
    CurrPage?:number;
    Record?:number;
}
