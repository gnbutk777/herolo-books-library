import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import allReducers from '../reducers'


var store
export default {
    configure: (initialState) => {

        const reducers = combineReducers(
            allReducers
        )

        store = createStore(
            reducers,
            applyMiddleware(thunk)
        )

        return store
    },
}
