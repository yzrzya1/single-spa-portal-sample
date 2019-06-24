import { Component, forwardRef, Inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, CounterActions } from "./store";
import {Globals} from "./globals.service";
import * as angularImg from "../assets/angular-logo.png";
import * as api from './utils/api.js';
import { map } from 'rxjs/operators';
import { find } from 'lodash';

@Component({
	selector: 'navbar',
	template: `
        <style>
            .navbar {
                font-family: Arial, Helvetica, sans-serif;
                position: fixed;
                top: 0;
                left: 0;
                background-color: #116466;
                color: white;
                font-size: 14px;
                font-weight: bold;
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
                overflow: hidden;
            }

            .navbar ul {
                display: flex;
                align-items: center;
                list-style-type: none;
                height: 100%;
            }

            .navbar li:hover {
                background-color: #d1e8e2;
            }

            .navbar li {
                padding-top: 14px;
                padding-bottom: -14px;
                padding-left: 10px;
                padding-right: 10px;
                height: 100%;
            }

            .navbar li:hover {
                color: black;
            }

            .navbar a {
                height: 100%;
                text-decoration: none;
                color: white;
            }
        </style>
        <div class="navbar">
            <ul>
                <a href="#/app1">
                    <li>
                        App 1 (React)
                    </li>
                </a>
                <a href="#/app2">
                    <li>
                        App 2 (Angular 7)
                    </li>
                </a>
                <a href="#/app3">
                    <li>
                        App 3 (Angular 1)
                    </li>
                </a>
                <a href="#/app4">
                    <li>
                        App 4 (Vue)
                    </li>
                </a>
                <a href="#/app5">
                    <li>
                        App 5 (Angular 6)
                    </li>
                </a>
                <a href="#/device">
                    <li>
                        Device (Angular 7)
                    </li>
                </a>
            </ul>
        </div>
	`,
})
export class NavBar {
    count: number;
    angularImg: any;
    subscription;
    getPeople;

    constructor(
        private ref: ChangeDetectorRef,
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => CounterActions)) private actions: CounterActions,
        @Inject(forwardRef(() => Globals)) private globals:Globals) {
        this.getPeople = api.getPeople;
    }

    counterUpdateListenerFn() {
        this.subscription = this.ngRedux.select<number>('count')
            .subscribe(newCount => {
                this.count = newCount;
                this.ref.detectChanges();
            });

    }

    ngOnInit() {
        this.angularImg = angularImg;
        this.counterUpdateListenerFn();
        this.getPeople().subscribe(res => console.log('from navbar', res));
        // console.log('app navbar', map);
        // console.log('app navbar', find);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
