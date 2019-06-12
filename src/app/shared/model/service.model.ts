export interface IService {
    CheckPack?: boolean;
    Id?: number;
    NameServicePack?: string;
}

export class Service implements IService {
    constructor(
       public CheckPack?: boolean,
       public Id?: number,
       public NameServicePack?: string,
    ) { }
}
