import { IMG_BASE64_PREFIX, IMG_BASE_PLACEHOLDER } from 'src/app/app.constant';
import { Duration } from 'moment';
import { Observable, of } from 'rxjs';

export const isDefined = obj => obj !== undefined && obj !== null;

export const isDefinedProp = (obj: Object, field: string) => isDefined(obj) && obj.hasOwnProperty(field);

export const parseJwt = jwt => {
    if (!isDefined(jwt)) {
        return null;
    }
    const split: string[] = jwt.split('.');
    if (split.length === 3) {
        return JSON.parse(window.atob(split[1].replace(/-/g, '+').replace(/_/g, '/')));
    }
    return null;
};

export function firstOrDefault<T>(arg: T[], defaultValue: T): T {
    if (isDefined(arg) && arg.length) {
        return Object.assign([], arg).pop();
    }
    return defaultValue;
}

export function pushBufferToString(arg: string, buffer: string, seperate: string): string {
    let strBufferred = <any>arg;
    seperate = seperate || ',';
    if (isDefined(arg)) {
        strBufferred = arg.split(seperate);
    }
    return pushArray(strBufferred, buffer).join(seperate);
}

export function pushArray<T>(arg?: T[], value?: T, key?: string): T[] {
    arg = arg || [];
    const isContain = arg.some(i => isDefined(key) && key !== '' ? i[key] === value[key] : i === value);
    if (!isContain) {
        arg.push(value);
    }
    return arg;
}

export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
};

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
};

export function forceInteger(value: any): number {
    const val = toInteger(value);
    return isNaN(val) ? 0 : val;
};

export function padNumber(value: number) {
    if (isNumber(value)) {
        return `0${value}`.slice(-2);
    } else {
        return '';
    }
};

export function getOuterHeight(el: HTMLElement): number {
    let height = forceInteger(el.offsetHeight);
    height += getOverHeight(el);
    return height;
}

export function getOverHeight(el: HTMLElement): number {
    const styles = window.getComputedStyle(el);
    return ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom'].reduce((total, key) => {
        return total + splitPixelValue(styles[key]);
    }, 0);
}

export function splitPixelValue(value?: string) {
    return value ? (value.endsWith('px') ? forceInteger(value.substring(0, value.length - 2)) : forceInteger(value)) : 0;
}

export function toTimeFormat(duration: Duration, hasSubfix?: boolean): Observable<string> {
    if (hasSubfix) {
        return of(`${toTimeString(duration.asHours(), 'HOURS')} giờ ${toTimeString(duration.asMinutes(), 'MINUTES')} phút ${toTimeString(duration.asSeconds(), 'SECONDS')} giây`);
    }
    return of(`${toTimeString(duration.asHours(), 'HOURS')}:${toTimeString(duration.asMinutes(), 'MINUTES')}:${toTimeString(duration.asSeconds(), 'SECONDS')}`);
}

export function toTimeString(value: number, type: 'HOURS' | 'MINUTES' | 'SECONDS') {
    switch (type) {
        case 'HOURS':
            return padNumber(Math.round(value % 24));
        default:
            return padNumber(Math.round(value % 60));
    }
}

export function getMenuRecursiveByCode(param: { tabCode: string; fromRoot?: boolean; }, source?: any[]) {
    let resource = source || [];
    if (param.fromRoot) {
        return resource.find(m => m.type === 'tab' && m.code === param.tabCode);
    }
    const root = resource.find(m =>
        m.type === 'sub' && (m.children || []).some(t =>
            t.type === 'tab' && t.code === param.tabCode)
    ) || { children: [] };
    return root.children.find(t => t.type === 'tab' && t.code === param.tabCode);
}

export function imageLinkFrom(base64String?: string, holder?: boolean) {
    return !isDefined(base64String) && holder ? `${IMG_BASE64_PREFIX}${IMG_BASE_PLACEHOLDER}` : `${IMG_BASE64_PREFIX}${base64String}`;
}