export class GlobalEventDistributor {

    constructor() {
        this.stores = {};
    }

    registerStore(name, store) {
        this.stores[name] = store;
    }

    removeStore(name) {
        delete this.stores[name];
    }

    dispatch(event) {
        Object.values(this.stores).forEach((s) => s.dispatch(event));
    }
}
