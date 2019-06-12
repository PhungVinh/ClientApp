import {Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output} from '@angular/core';
import { isDefined } from '../util/common.util';

@Directive({
    selector: '[appControlValue]'
})
export class ControlValueDirective {

    constructor(
        private el: ElementRef,
        // private _ngZone: NgZone
    ) { }

    // @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

    @HostListener('keyup', ['$event']) onKeyPress(event: KeyboardEvent) {
        const e = <KeyboardEvent>event;
        const value = (<any>e.target).value || '';
        if (value !== '') {
            (<HTMLElement>this.el.nativeElement).classList.add('has-value');
        } else {
            (<HTMLElement>this.el.nativeElement).classList.remove('has-value');
        }
        // this._ngZone.run(() => this.ngModelChange.emit(value));
    }

}
