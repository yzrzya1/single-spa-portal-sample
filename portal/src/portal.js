import 'zone.js';
import { start } from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import { loadApp, portalStoreInit } from './helper';

async function init() {

    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    portalStoreInit(globalEventDistributor);

    // app1: The URL "/app1/..." is being redirected to "http://localhost:9001/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app1', '/app1', '/app1/singleSpaEntry.js', '/app1/store.js', globalEventDistributor));

    // app2: The URL "/app2/..." is being redirected to "http://localhost:9002/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app2', '/app2', '/app2/singleSpaEntry.js', '/app2/store.js', globalEventDistributor));

    // app3: The URL "/app3/..." is being redirected to "http://localhost:9003/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app3', '/app3', '/app3/singleSpaEntry.js', '/app3/store.js', globalEventDistributor));

    // app3: The URL "/app4/..." is being redirected to "http://localhost:9004/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app4', '/app4', '/app4/singleSpaEntry.js', '/app4/store.js', globalEventDistributor));

    // app5: The URL "/app5/..." is being redirected to "http://localhost:9005/..." this is done by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('app5', '/app5', '/app5/singleSpaEntry.js', '/app5/store.js', globalEventDistributor));

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    start();
    // console.log(globalEventDistributor);

    // console.log(setState(globalEventDistributor.stores.portal));


}


init();


function setState(portalState) {
    const state = portalState.getState();
    console.log(portalState, state, window.document.querySelector('body .navbar #store'));
}
