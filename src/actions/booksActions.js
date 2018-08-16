import constants from "../constants";



export const fetchBooks = (query='pokemon') => {
    return (dispatch)=> {
        dispatch({type:constants.FETCH_BOOKS});
        return fetch('https://www.googleapis.com/books/v1/volumes?q='+ query)
            .then(res => res.json())
            .then(result => dispatch({type: constants.FETCH_BOOKS_SUCCESS, payload: result.items}))
            .catch(error => dispatch({type: constants.FETCH_BOOKS_FAILED, payload: error}));
    }
}
export const deleteBook = (bookId) => {
    return{
        type:constants.DELETE_BOOK,
        payload: bookId
    }
}

export const addBook = (book)=>{
    return{
        type:constants.ADD_BOOK,
        payload: book
    }
}
export const editBook = (book)=>{
    return {
        type: constants.EDIT_BOOK,
        payload: book
    }
}

export const orderBook = (order)=>{
    return {
        type: constants.ORDER_BOOK,
        payload: order
    }
}