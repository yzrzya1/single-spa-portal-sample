
SystemJS.config(window.sofeManifest);

registerDep('sofe', () => require('sofe'));

// See https://rxjs-dev.firebaseapp.com/guide/v6/migration for Import Paths explanation
registerDep('rxjs', () => require('rxjs'));
registerDep('rxjs/operators', () => require('rxjs/operators'));
registerDep('lodash', () => require('lodash'));

registerDep('@angular/common', () => require('@angular/common'));
registerDep('@angular/core', () => require('@angular/core'));
registerDep('@angular/compiler', () => require('@angular/compiler'));
registerDep('@angular/forms', () => require('@angular/forms'));
registerDep('@angular/router', () => require('@angular/router'));
registerDep('@angular/platform-browser', () => require('@angular/platform-browser'));
registerDep('@angular/platform-browser-dynamic', () => require('@angular/platform-browser-dynamic'));


function registerDep(name, requirer) {
    SystemJS.registerDynamic(name, [], false, function(_r, _e, _m) {
        _m.exports = requirer()
    })
}