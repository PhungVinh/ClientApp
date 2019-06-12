import { ElementRef } from '@angular/core';

export interface IComponentRender {
    /**
     * set initial height for rest & view child of component
     * if not using please comment keep throw Error 'Method not implemented.'
     * @param _el host element reference
     */
    setComponentHeight(_el: ElementRef),
    /**
     * set initial height for rest & modal reference of component
     * if not using please comment keep throw Error 'Method not implemented.'
     * @param _el host element reference
     */
    setReferenceModalRender(_el: ElementRef)
}