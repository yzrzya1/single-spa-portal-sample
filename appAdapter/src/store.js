import { createStore, combineReducers } from 'redux';

const initialState = {
    count: 0
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_INIT_VALUE':
            return {
                ...action.value,
            };
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}
function lastAction(state = null, action) {
    return action;
}
const rootReducer = combineReducers({
    reducer,
    lastAction,
});

export const storeInstance = createStore(rootReducer);

export function storeInstanceWithInitState(initState) {
    return createStore(rootReducer, initState);
}
