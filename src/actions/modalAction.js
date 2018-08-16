import constants from '../constants'

export const openModal = (item) =>{
    return {
        type: constants.OPEN_MODAL,
        payload: item
    }
}
export const closeModal = () =>{
    return{
        type: constants.CLOSE_MODAL
    }
}