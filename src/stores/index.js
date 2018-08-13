import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { booksReducer } from '../reducers'


var store
export default {

    configure: (initialState) => { // initialState can be null

        const reducers = combineReducers({ // insert reducers here
            booksReducer,
        })

        if (initialState){
            store = createStore(
                reducers,
                initialState,
                applyMiddleware(thunk)
            )
            store = createStore(
                reducers,
                applyMiddleware(thunk)
            )

            return store
        }

        store = createStore(
            reducers,
            applyMiddleware(thunk)
        )

        return store
    },

    currentStore: () => {
        return store
    }
}
