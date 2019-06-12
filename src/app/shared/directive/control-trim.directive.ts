import {Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output} from '@angular/core';
import { isDefined } from '../util/common.util';

@Directive({
    selector: '[ControlTrim]'
})
export class ControlTrimDirective {

    private deepRexgex = /[ \f\r\t\v\u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+/g;

    constructor(
        private el: ElementRef,
        private _ngZone: NgZone
    ) { }

    @Input() ControlTrim?: 'left' | 'right' | 'deep' | 'both';
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

    @HostListener('blur', ['$event']) onBlur(event: FocusEvent) {

        const e = <FocusEvent>event;
        let value = (<any>e.target).value || '';
        if (isDefined(value)) {
            switch (this.ControlTrim) {
                case 'left':
                        value = (value as string).trimLeft();
                    break;
                case 'right':
                        value = (value as string).trimRight();
                    break;
                case 'both':
                        value = (value as string).trim();
                    break;
                case 'deep':
                    value = value.replace(this.deepRexgex, ' ');
                    case 'both':
                    value = value.trim()
                    break;
            }
        }
        this._ngZone.run(() => this.ngModelChange.emit(value));
    }

}
