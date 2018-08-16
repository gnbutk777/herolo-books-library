import constants from "../constants";



export const openDeleteBookModal = (bookId)=>{
    return {
        type:constants.OPEN_DELETE_BOOK_MODAL,
        payload:bookId
    }
}

export const closeDeleteBookModal=()=>{
    return{
        type: constants.CLOSE_DELETE_BOOK_MODAL
    }
}
