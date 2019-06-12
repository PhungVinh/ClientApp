import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { EL_NAVBAR_QUERY_SELECTOR, EL_TAB_QUERY_SELECTOR, EL_PCODE_EXPANDED_QUERY_SELECTOR } from 'src/app/app.constant';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalConfirmComponent implements OnInit {
  @Input() identity: string = moment().format('YYYYMMDDHHmmssSSSZ');
  @Input() dialogClass: string;
  @Input() confirmMessage: string;
  @Input() confirmType: 'None' | 'Delete' | 'LostConnection' | 'Warning' = 'Delete';
  @Input() hideFooter = false;
  @Input() outsizeClose = true;
  @Input() staticCenter = true;
  @Input() isNotify = false;
  @Input() notifyAction = 'OK';
  @Input() okAction = 'Có';
  @Input() closeAction = 'Không';
  @Output('onAccepted') onAccepted = new EventEmitter();
  @Output('onConfirmed') onConfirmed = new EventEmitter();
  public visible = false;
  public visibleAnimate = false;
  reference?: any;

  lst = [{ id: 1, isDisable: false }, { id: 2, isDisable: false }, { id: 3, isDisable: false }, { id: 4, isDisable: false }];
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() { }

  configStaticCenter() {
    if (this.el.nativeElement && this.el.nativeElement.firstChild) {
      const backdrop = <HTMLElement>(<HTMLElement>this.el.nativeElement).firstElementChild;
      const parentModal = backdrop.closest('.modal-dialog');
      const modalConfirm = <HTMLElement>backdrop.firstElementChild;
      const mdHeight = modalConfirm.offsetHeight;
      const mdWidth = modalConfirm.offsetWidth;
      if (parentModal) {
        const bdHeight = backdrop.offsetHeight;
      const bdWidth = backdrop.offsetWidth;
        modalConfirm.style.top = `${(bdHeight - mdHeight) / 2}px`;
        modalConfirm.style.left = `${(bdWidth - mdWidth) / 2}px`;
      } else {
        const navbar = <HTMLElement>document.querySelector(EL_NAVBAR_QUERY_SELECTOR);
        const topbar = <HTMLElement>document.querySelector(EL_TAB_QUERY_SELECTOR);
        const leftSize = navbar.clientWidth + backdrop.offsetLeft;
        const topSize = topbar.offsetTop;
        modalConfirm.style.top = `${(window.outerHeight - topSize - mdHeight) / 2}px`;
        modalConfirm.style.left = `${leftSize + (backdrop.clientWidth - mdWidth) / 2}px`;
      }
    }
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
      this.configStaticCenter();
    }, 100);

  }

  public showReference(reference?: any): void {
    console.log('reference', reference);
    this.visible = true;
    this.reference = reference;
    setTimeout(() => {
      this.visibleAnimate = true;
      this.configStaticCenter();
    }, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.reference = undefined;
    this.onConfirmed.emit('IGNORED');
    setTimeout(() => this.visible = false, 300);
  }

  onAccept(): void {
    this.onConfirmed.emit('ACCEPTED');
    this.onAccepted.emit(this.reference);
    this.visibleAnimate = false;
    this.reference = undefined;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      if (this.outsizeClose) {
        this.hide();
      }
    }
  }

}
