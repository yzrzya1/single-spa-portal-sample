import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Device } from './device.component';
import { Subroute1 } from './subroute1.component';
import { Subroute2 } from './subroute2.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from './store';
import { Globals } from './globals.service';
import { configFactory, ConfigService } from './config.service';

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
        ConfigService,
        // {provide: APP_INITIALIZER, useFactory: configFactory, deps:[ConfigService], multi: true },
        CounterActions, Globals],
    declarations: [
        Device,
        Subroute1,
        Subroute2,
    ],
    bootstrap: [Device]
})
export class MainModule {
    constructor(private ngRedux: NgRedux<IAppState>,
                private globals: Globals,
                @Inject('localStoreRef') private localStoreRef: any,
                @Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any) {
        this.ngRedux.provideStore(localStoreRef);
        this.globals.globalEventDistributor = globalEventDispatcherRef;
    }
}
