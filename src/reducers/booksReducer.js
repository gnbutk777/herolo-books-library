import constants from '../constants'

const INITIAL_STATE = {booksIsFetching: false, booksIsFetched: false ,booksList: []}


export default (state = INITIAL_STATE, action) => {
    let booksList =[]
    let index
    switch(action.type){
        case constants.ADD_BOOK:
            booksList = [...state.booksList]
            let newBook = action.payload
            booksList.push(newBook)
            state = { ...state, booksList }
            break
        case constants.DELETE_BOOK:
            booksList =[...state.booksList]
            index  = booksList.findIndex(book=>{return book.id === action.payload})
            booksList.splice(index,1)
            state = {...state, booksList}
            break
        case constants.EDIT_BOOK:
            booksList = [...state.booksList]
            index  = booksList.findIndex(book=>{return book.id === action.payload.id})
            booksList.splice(index, 1, action.payload)
            state = {...state, booksList}
            break
        case constants.FETCH_BOOKS:
            state = {...state, booksIsFetching: true}
            break
        case constants.FETCH_BOOKS_SUCCESS:
                action.payload.map((item)=>{
                    let id = item.id
                    let {volumeInfo} = item
                    let title = volumeInfo.title
                    title = title.toLowerCase().replace(/([^\w]|_)+/g, ' ').replace(/\b\w/g, t => t.toUpperCase()).trim();
                    let publishedDate = volumeInfo.publishedDate
                    let authors = volumeInfo.authors
                    booksList.push({id, title, publishedDate, authors})
                })
                state = {...state, booksIsFetched:true,booksIsFetching:false, booksList}
            break
        case constants.ORDER_BOOK:
            let newOrder = [...state.booksList]
            switch (action.payload){
                case 'A-Z':
                    newOrder = newOrder.sort((a, b)=>{
                        return  a.title < b.title?-1:1
                })
            }
            state = {...state, booksList: newOrder }
            break
    }
    return state
}