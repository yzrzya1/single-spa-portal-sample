import './app.module.js';
import './routes.js';
import angular from "angular";
import {storeInstance} from "./store";


const GlobalEventDistributor = /** @class */ (function () {
    function GlobalEventDistributor() {
        this.stores = [];
    }

    GlobalEventDistributor.prototype.registerStore = function (store) {
        this.stores.push(store);
    };
    GlobalEventDistributor.prototype.dispatch = function (event) {
        this.stores.forEach(function (s) {
            return s.dispatch(event);
        });
    };
    return GlobalEventDistributor;
}());

const props = {
    store: storeInstance,
    globalEventDistributor: new GlobalEventDistributor(),
};

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
    .service('localStoreRef', [function localStoreRef() {
        return props.store;
    }])
    .service('globalEventDispatcherRef', [function globalEventDispatcherRef() {
        return props.globalEventDistributor;
    }])
    .service("counter", ['localStoreRef', 'globalEventDispatcherRef', function (localStoreRef, globalEventDispatcherRef) {
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
