import constants from '../constants'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case constants.ADD_BOOK:
            break
        case constants.EDIT_BOOK:
            break
        default:
            return state
    }
}