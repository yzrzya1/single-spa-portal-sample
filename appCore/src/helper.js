import { registerApplication } from 'single-spa';
import { storeInstance } from "./store";

export function hashPrefix(prefix) {
    if (prefix === '/navbar') {
      return function (x) {
        return true;
      };
    }
    return function (location) {
        console.log(prefix, location);
        return true;
        // return location.hash.startsWith(`#${prefix}`);
    }
}


export async function loadStore(name, storeModule, storeURL, globalEventDistributor, customProps) {

    // try to import the store module
    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;
        let portalState;
        try {
            portalState = globalEventDistributor.stores.portal.getState();
        } catch (e) {
            console.log(`Could not load portal store `, e);
        }
        if (storeModule.storeInstanceWithInitState && portalState) {
            customProps.store = storeModule.storeInstanceWithInitState(portalState);
        }
        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(name, customProps.store);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {

    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    // register the app with singleSPA and pass a reference to the store of the app as well as a reference to the globalEventDistributor
    registerApplication(
        name,
        async () => {
            console.log(`${name} loaded`);
            await loadStore(name, storeModule, storeURL, globalEventDistributor, customProps);
            return SystemJS.import(appURL);
        },
        hashPrefix(hash), customProps,
    );
}


export function portalStoreInit(globalEventDistributor) {

    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor}, name = 'portal';

    try {
        storeModule = { storeInstance };
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;
        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(name, storeModule.storeInstance);
    }
    return storeModule;
}
