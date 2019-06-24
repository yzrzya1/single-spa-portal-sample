import React from 'react';
import { render } from 'react-dom';
import Root from './root.component';
import {storeInstance} from "./store";

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

const props = {
    store: storeInstance,
    globalEventDistributor: new GlobalEventDistributor(),
};

render(<Root store={props.store} globalEventDistributor={props.globalEventDistributor}/>, document.querySelector('app1'));
