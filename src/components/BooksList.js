import React from 'react'
import './BooksList.css'
import BooksProperty from "./BooksProperty";

class BooksList extends React.Component{


    render() {
        return (
            <div className={'bookDetails'}>
                <p>Book Title</p>
                <p>Author Name:<BooksProperty/> </p>
                <p>Published Date: </p>
                <button>Edit</button>
            </div>
        )
    }
};

export default BooksList