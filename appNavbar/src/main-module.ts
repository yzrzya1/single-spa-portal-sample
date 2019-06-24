import {Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NavBar} from './navbar.component';
import {Subroute1} from './subroute1.component';
import {Subroute2} from './subroute2.component';
import { Routes} from "@angular/router";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from './store';
import { Globals } from "./globals.service";

const appRoutes: Routes = [
	{
		path: 'subroute1',
		component: Subroute1
	},
	{
		path: 'subroute2',
		component: Subroute2
	},
	{
		path: '**',
	}
];

@NgModule({
	imports: [
		BrowserModule,
		// RouterModule.forRoot(appRoutes, {
		// 	useHash: true
		// }),
        NgReduxModule
	],
	providers: [
		// {provide: APP_BASE_HREF, useValue: '/pages/third-party-apps/'},
		CounterActions, Globals],
	declarations: [
        NavBar,
		Subroute1,
		Subroute2,
	],
	bootstrap: [NavBar]
})
export class MainModule {
    constructor(private ngRedux: NgRedux<IAppState>,
                private globals:Globals,
                @Inject('localStoreRef') private localStoreRef: any,
                @Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any) {

        this.ngRedux.provideStore(localStoreRef);
        this.globals.globalEventDistributor = globalEventDispatcherRef;
    }
}
