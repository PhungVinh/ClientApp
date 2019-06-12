import { Component, OnInit, forwardRef, Input, HostListener, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styles: [`
    :host button {
      width: 200px;
      max-width: 250px;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    :host button.dropdown-toggle {
      color: initial;
      text-align: left;
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
    }
    :host button.dropdown-toggle:hover {
      background-color: #fff;
      color: initial;
    }
    :host button.dropdown-toggle::after {
      display: inline-flex;
      align-items: center;
      align-self: center;
    }
    .dropdown-toggle{
      border-color: #cccccc;
      padding: 7px 15px;
      font-size: 14px;
    }
    .dropdown-menu{
      overflow-y: scroll;
      height: 400px;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit {

  @Input() datasource: any[];
  @Input() sourceKey: string;
  @Input() sourceValue: string;
  @Input() selectedObject = false;
  @Input() holderText = 'Tất cả';

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isShow = false;
    }
  }

  constructor(
    private el: ElementRef
  ) { }

  value: any;
  propagateChange = (_: any) => { };

  isShow: boolean;

  ngOnInit() {
  }

  onToggle = () => this.isShow = !this.isShow;

  onSelectedChange = selectedValue => {
    this.isShow = false;
    console.log('selectedValue', selectedValue);
    if (this.selectedObject) {
      this.writeValue(this.datasource.find(ds => ds[this.sourceKey] === selectedValue));
    } else {
      this.writeValue(selectedValue);
    }
  }

  formatterSelected = () => {
    if (!this.selectedObject) {
      return this.value;
    }
    return this.value ? this.value[this.sourceValue] : this.holderText;
  }

  writeValue(obj: any): void {
    console.log('writeValue', obj);
    this.value = obj;
    this.propagateChange(this.value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }


  setDisabledState(isDisabled: boolean): void {
    // do nothing
  }

}