import angular from 'angular';
angular
    .module('app')
    .component('root', {
        template: `
        <div>
                    <img ng-src="{{angularImg}}" style="width: 100px;"/>
		</div>
        <br />
            <div>
              This was rendered by App3 which is written in Angular 1.6
            </div>
            <div>
                <b> Count: {{ counter.count.reducer.count }}</b><br/><br/>
            
                <button ng-click="counter.increment()">global increment</button>&nbsp;Send a <b>global</b> increment event.
                This will increase the counter for the current app and all other apps that listen to this event. <br/>
                
                <button ng-click="counter.decrement()">global decrement</button>&nbsp;Send a <b>global</b> decrement event.
                This will increase the counter for the current app and all other apps that listen to this event. <br/>
            </div>
            
            <!--<a href="#/pages/third-party-apps/subroute1">Subroute 1</a>-->
            <!--<a href="#/pages/third-party-apps/subroute2">Subroute 2</a>-->
            
            <ui-view />
        `,
        controllerAs: 'vm',
        controller: ['counter', '$scope', '$rootScope', function rootCtrl(counter, $scope, $rootScope) {
            const vm = this;
            $scope.angularImg = require('./assets/AngularJS_logo.svg.png');

            // load init val
            $scope.counter = counter.getInstance();
            // register update count listener
            counter.getInstance().updateListenerFn(() => {
                $rootScope.safeApply(() => {
                    $scope.counter = counter.getInstance();
                })
            });

        }]
    })
    .component('app3Root', {
        template: `
        <div style="margin-top: 100px;">
                    <img ng-src="{{angularImg}}" style="width: 100px;"/>
		</div>
        <br />
            <div>
              This was rendered by App3 which is written in Angular 1.6
            </div>
            <div>
                <b> Count: {{ counter.count.reducer.count }}</b><br/><br/>
            
                <button ng-click="counter.increment()">global increment</button>&nbsp;Send a <b>global</b> increment event.
                This will increase the counter for the current app and all other apps that listen to this event. <br/>
                
                <button ng-click="counter.decrement()">global decrement</button>&nbsp;Send a <b>global</b> decrement event.
                This will increase the counter for the current app and all other apps that listen to this event. <br/>
            </div>
            
            <!--<a href="#/pages/third-party-apps/subroute1">Subroute 1</a>-->
            <!--<a href="#/pages/third-party-apps/subroute2">Subroute 2</a>-->
            
            <ui-view />
        `,
        controllerAs: 'vm',
        controller: ['counter', '$scope', '$rootScope', function rootCtrl(counter, $scope, $rootScope) {
            const vm = this;
            $scope.angularImg = require('./assets/AngularJS_logo.svg.png');
            // load init val
            $scope.counter = counter.getInstance();
            // register update count listener
            counter.getInstance().updateListenerFn(() => {
                $rootScope.safeApply(() => {
                    $scope.counter = counter.getInstance();
                })
            });

        }]
    });
