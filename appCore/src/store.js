import { createStore, combineReducers } from 'redux';

const initialState = {
    count: 0
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            };
        case 'DECREMENT':
            return {
                count: state.count - 1
            };
        case 'APP_ADD':
            return {
                ...state,
            };
        default:
            return state;
    }
}
// lastAction topic related https://github.com/reduxjs/redux/issues/580
function lastAction(state = null, action) {
    return action;
}
const rootReducer = combineReducers({
    reducer,
    lastAction,
});
export const storeInstance = createStore(rootReducer);
