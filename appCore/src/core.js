import 'zone.js';
import {start, getMountedApps} from 'single-spa';
import {GlobalEventDistributor} from './globalEventDistributor'
import {loadApp, portalStoreInit} from './helper';

async function init() {
    // global init
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];
    window.mounted_apps = [];
    // event listener for core

    const { storeInstance:store } = portalStoreInit(globalEventDistributor);
    store.subscribe(() => {
        const { lastAction } = store.getState();
        if (lastAction.type === 'APP_ADD') {
            process(lastAction.payload, loadingPromises, globalEventDistributor);
        }
    });
    // w8 singleSpa promise resolve
    await Promise.all(loadingPromises);

    // start singleSpa
    start();

    // run adapter for app selection
    loadFn(preloadApp.adapter, globalEventDistributor);
}

init();

function process(x, loadingPromises, globalEventDistributor) {
    window.mounted_apps = getMountedApps();
    if (x) {
        if (!window.mounted_apps.includes(x.name)) {
            loadingPromises.push(loadFn(x, globalEventDistributor));
        } else {
            console.log(`app ${x.name} already loaded`);
        }
    }
}

function loadFn(app, globalEventDistributor) {
    return loadApp(app.name, app.routeHash, app.appUrl, app.storeUrl, globalEventDistributor)
}

const preloadApp = {
    app1: {
        name: 'app1',
        routeHash: 'app1',
        appUrl: '/app1/singleSpaEntry.js',
        storeUrl: '/app1/store.js',
    },
    app2: {
        name: 'app2',
        routeHash: 'app2',
        appUrl: '/app2/singleSpaEntry.js',
        storeUrl: '/app2/store.js',
    },
    app3: {
        name: 'app3',
        routeHash: 'app3',
        appUrl: '/app3/singleSpaEntry.js',
        storeUrl: '/app3/store.js',
    },
    app4: {
        name: 'app4',
        routeHash: 'app4',
        appUrl: '/app4/singleSpaEntry.js',
        storeUrl: '/app4/store.js',
    },
    app5: {
        name: 'app5',
        routeHash: 'app5',
        appUrl: '/app5/singleSpaEntry.js',
        storeUrl: '/app5/store.js',
    },
    navbar: {
        name: 'navbar',
        routeHash: 'navbar',
        appUrl: '/navbar/singleSpaEntry.js',
        storeUrl: '/navbar/store.js',
    },
    device: {
        name: 'device',
        routeHash: 'device',
        appUrl: '/device/singleSpaEntry.js',
        storeUrl: '/device/store.js',
    },
    adapter: {
        name: 'adapter',
        routeHash: 'adapter',
        appUrl: '/adapter/singleSpaEntry.js',
        storeUrl: '/adapter/store.js',
    },
};
