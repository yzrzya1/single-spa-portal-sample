import {Action, createStore, Store,combineReducers} from 'redux';

export interface IAppState {
    count: number
}

export const INITIAL_STATE: IAppState = { count: 0 };

export class CounterActions {
    static INCREMENT = 'INCREMENT';
    static DECREMENT = 'DECREMENT';

    increment(): Action {
        return { type: CounterActions.INCREMENT };
    }

    decrement(): Action {
        return { type: CounterActions.DECREMENT };
    }
}

export function reducer(lastState = INITIAL_STATE, action: Action) {
    switch(action.type) {
        case CounterActions.INCREMENT: return { count: lastState.count + 1 };
        case CounterActions.DECREMENT: return { count: lastState.count - 1 };
    }

    return lastState;
}

function lastAction(state = null, action) {
    return action;
}
const rootReducer = combineReducers({
    reducer,
    lastAction,
});

export const storeInstance: Store<IAppState> = createStore(rootReducer);


export function storeInstanceWithInitState(initState) {
    return createStore(rootReducer, initState);
}
