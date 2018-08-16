import constants from '../constants'

const INITIAL_STATE = {isDeleteBookModalOpened: false,currentBookId: null}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case constants.OPEN_DELETE_BOOK_MODAL:
            state = {...state, isDeleteBookModalOpened: true,currentBookId: action.payload}
            break;
        case constants.CLOSE_DELETE_BOOK_MODAL:
            state = {...state, isDeleteBookModalOpened: false}
    }
    return state
}