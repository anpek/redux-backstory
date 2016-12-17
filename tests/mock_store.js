import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import fetch from 'isomorphic-fetch';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

let initialState = {
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_ASYNC_SUCCESS':
            return Object.assign({}, {data: action.payload}, state);
        case 'FETCH_SYNC_SUCCESS':
            return Object.assign({}, {data2: action.payload}, state);
        default:
            return state;
    }
}

export function fetchDataAsync(user) {

    return (dispatch) => {

        return fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'FETCH_ASYNC_SUCCESS', payload: data })
            })
    }
}


export function fetchDataSync(data) {
    return { type: 'FETCH_SYNC_SUCCESS', payload: data };
}

export default store;