import './polyfills';
import 'core-js/es7/reflect';
import {storeInstance} from './store';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainModule } from './main-module';
import { Router } from '@angular/router';

export class GlobalEventDistributor {
    stores;
    constructor() {
        this.stores = [];
    }

    registerStore(store) {
        this.stores.push(store);
    }

    dispatch(event) {
        this.stores.forEach((s) => s.dispatch(event));
    }
}

const spaProps = {
    bootstrappedModule: null,
    Router: Router
};

const props: any = {
    store: storeInstance,
    globalEventDistributor: new GlobalEventDistributor(),
};

platformBrowserDynamic([
    {provide: 'localStoreRef', useValue: props.store },
    {provide: 'globalEventDispatcherRef', useValue: props.globalEventDistributor }])
    .bootstrapModule(MainModule).then(module => {
    return spaProps.bootstrappedModule = module;
});

