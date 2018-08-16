import constants from '../constants'


const INITIAL_STATE = {isModalOpened: false, currentBookId: null }


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case constants.OPEN_MODAL:
            state = {...state, isModalOpened: true,currentBookId: action.payload}
            break
        case constants.CLOSE_MODAL:
            state = {...state, isModalOpened: false}
            break
    }
    return state
}