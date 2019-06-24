import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        // el: '#app4',
        render: h => h(App)
}
});

export function bootstrap(props) {
    props.domElement = createDomElement();
    return vueLifecycles.bootstrap(props);
}

export function mount(props) {
    props.domElement = createDomElement();
    return vueLifecycles.mount(props);
}

export function unmount(props) {
    props.domElement = createDomElement();
    return vueLifecycles.unmount(props);
}

function createDomElement() {
    // Make sure there is a div for us to render into
    let el = document.getElementById('app4');

    if (!el) {
        el = document.createElement('div');
        el.id = 'app4';
        document.body.appendChild(el);
    }
    return el;
}