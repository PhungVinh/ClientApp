import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter'
})

export class FilterName implements PipeTransform {
    transform(arrFilter: any[], termSearch: any) {
        if (!arrFilter || !termSearch) {
            return arrFilter;
        }
        return arrFilter.filter(item => item.AttributeLabel.toLowerCase().indexOf(termSearch.toLowerCase()) !== -1);
    }
}