import singleSpaAngular1 from 'single-spa-angular1';
import angular from 'angular';

import './app.module.js';
import './routes.js';

const angularLifecycles = singleSpaAngular1({
    angular,
    domElementGetter,
    mainAngularModule: 'app',
    uiRouter: true,
    preserveGlobal: false,
});

export function bootstrap(props) {
    return angularLifecycles.bootstrap(props);
}

export function mount(props) {
    angular
        .module('app')
        .config([
            '$provide', function($provide) {
                return $provide.decorator('$rootScope', [
                    '$delegate', function($delegate) {
                        $delegate.safeApply = function(fn) {
                            const phase = $delegate.$$phase;
                            if (phase === "$apply" || phase === "$digest") {
                                if (fn && typeof fn === 'function') {
                                    fn();
                                }
                            } else {
                                $delegate.$apply(fn);
                            }
                        };
                        return $delegate;
                    }
                ]);
            }
        ])
        .service('localStoreRef', [function localStoreRef() { return props.store }])
        .service('globalEventDispatcherRef', [function globalEventDispatcherRef() { return props.globalEventDistributor }])
        .service("counter", ['localStoreRef', 'globalEventDispatcherRef', function(localStoreRef, globalEventDispatcherRef) {
            let counter = function () {
                this.count = localStoreRef.getState();
                this.increment = function () {
                    globalEventDispatcherRef.dispatch({type: 'INCREMENT'});
                    this.count = localStoreRef.getState();
                };
                this.decrement = function () {
                    globalEventDispatcherRef.dispatch({type: 'DECREMENT'});
                    this.count = localStoreRef.getState();
                };
                this.updateListenerFn = localStoreRef.subscribe.bind(this);
            };
            return {
                getInstance: function () {
                    return new counter();
                }
            }
        }]);
    return angularLifecycles.mount(props);
}

export function unmount(props) {
    return angularLifecycles.unmount(props);
}

function domElementGetter() {
    const name = 'app3';
    // Make sure there is a div for us to render into
    let el = window.document.getElementById(name);
    if (!el) {
        el = window.document.createElement('div');
        el.id = name;
        window.document.body.appendChild(el);
    }

    if(!el.querySelector(name)) {
        const a =window.document.createElement(name);
        el.appendChild(a);
    }

    return el;
}
