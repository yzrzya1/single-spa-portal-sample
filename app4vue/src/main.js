import Vue from 'vue'
import App from './App.vue'
import {storeInstance} from "./store";

Vue.config.productionTip = false;


const GlobalEventDistributor = /** @class */ (function () {
    function GlobalEventDistributor() {
        this.stores = [];
    }
    GlobalEventDistributor.prototype.registerStore = function (store) {
        this.stores.push(store);
    };
    GlobalEventDistributor.prototype.dispatch = function (event) {
        this.stores.forEach(function (s) { return s.dispatch(event); });
    };
    return GlobalEventDistributor;
}());

const props = {
    store: storeInstance,
    globalEventDistributor: new GlobalEventDistributor(),
};

new Vue({
    render: h => h(App),
    data() {
        // console.log(this);
        this.$root.store = props.store;
        this.$root.globalEventDistributor = props.globalEventDistributor;
        return {
            count: 0
        }
    }
}).$mount('#app');
