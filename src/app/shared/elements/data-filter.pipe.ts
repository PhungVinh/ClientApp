import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})

export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        console.log('query', query);
        if (query) {
            return _.filter(array, row=>row.authorityName.indexOf(query) > -1);
        }
        return array;
    }
}