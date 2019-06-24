import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component.js';

const reactLifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: Root,
	domElementGetter,
});

export function bootstrap(props) {
	return reactLifecycles.bootstrap(props);
}

export function mount(props) {
	return reactLifecycles.mount(props);
}

export function unmount(props) {
	return reactLifecycles.unmount(props);
}

function domElementGetter() {
	const name = 'adapter';
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
