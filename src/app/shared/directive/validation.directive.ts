import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[PatternOnly]'
})
export class PatternOnlyDirective {

    regexStr = /^\+?\d{0,12}$/;
    constructor(private el: ElementRef) { }

    @Input() PatternOnly: RegExp;

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        const e = <KeyboardEvent>event;
        const targetEl = (event.target as any);
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && e.ctrlKey === true) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && e.ctrlKey === true) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        const ch = e.key;
        // let regEx = new RegExp(this.PhoneNumberRegExp);
        const srcValue = targetEl.value as string;
        const newValue = srcValue.slice(0, targetEl.selectionStart) + e.key + srcValue.slice(targetEl.selectionStart);
        const regEx = new RegExp(this.PatternOnly);
        if (regEx.test(newValue)) {
            return;
        } else {
            e.preventDefault();
        }
    }

    @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
        const e = <ClipboardEvent>event;
        let pastedText = e.clipboardData.getData('text');
        const regEx = new RegExp(this.PatternOnly);
        if (regEx.test(pastedText)) {
            return;
        } else {
            e.preventDefault();
        }
    }

    @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
        const e = <DragEvent>event;
        let pastedText = e.dataTransfer.getData('text');
        const regEx = new RegExp(this.PatternOnly);
        if (regEx.test(pastedText)) {
            return;
        } else {
            e.preventDefault();
        }
    }

}
