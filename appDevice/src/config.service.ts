import { APP_INITIALIZER, Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {

    fetchWithCache;

    constructor() {
    }

    initFetchWithCacheFn() {
        return from(window['SystemJS'].import('fetchWithCache!sofe')).pipe(map(x => {
            this.fetchWithCache = x['default'];
            return x['default'];
        }));
    }
    fetchWithCacheLoadFn() {

    }

}


export function configFactory(config: ConfigService) {
    return () => config.initFetchWithCacheFn();
}
