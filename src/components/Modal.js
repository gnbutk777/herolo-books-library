import React from 'react'
import './Modal.css'
import {connect} from "react-redux";
import { closeModal } from "../actions/modalAction"
import { addBook, editBook } from "../actions/booksActions";
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

class Modal extends React.Component{
    constructor(){
        super();
        this.test = 0
        this.state = {
            isEditMode:false,
            bookId: '',
            bookName: '',
            authors: [],
            publishedDate: '',
            bookNameError: '',
            authorsError: '',
            modalTitle: ''
        }
    }
    componentWillMount(){
        let currentBookId = this.props.currentBookId
        let currentBook = this.props.books.find((obj)=>{return obj.id === currentBookId})
        if(!currentBook){
            let modalTitle = 'Add New Book'
            let bookId = this.createNewId(this.props.books)
            let publishedDate = moment().format('L')
            let isEditMode = false
            this.setState({bookId, modalTitle, publishedDate, isEditMode})
        }else{
            let bookId = currentBook.id
            let bookName = currentBook.title
            let publishedDate = currentBook.publishedDate
            let authors = currentBook.authors
            let modalTitle = 'Edit Book'
            let isEditMode = true
            this.setState({bookId, bookName, publishedDate, authors, modalTitle, isEditMode})
        }
    }
    createNewId(booksList){
        let id = Math.random().toString(36).substring(7);
        if(booksList.find((obj)=>{return obj.id === id})){
            return this.createNewId(booksList)
        }else{
            return id
        }
    }

    onChangeBookName=(e)=>{
        let bookName = e.target.value
        let nonEnglish = bookName.match(/[^A-Za-z0-9\s]/g)
        let bookNameError=''
        if(nonEnglish) {
            bookNameError = "Remove any non-English letters like: " + nonEnglish.toString()
        }
        bookName = bookName.toLowerCase().replace(/\b\w/g, t => t.toUpperCase())
            this.setState({bookName,bookNameError})
    }

    onChangeAuthors=(e)=>{
        let value = e.target.value
        let authors = value.split(',')
        let authorsError =  ''
        this.setState({authors, authorsError})
    }

    onChangePublishDate = (momentDate)=>{
        let  publishedDate = momentDate.format('L')
        this.setState({publishedDate})
    }

    saveButtonClicked(){
        let bookId = this.state.bookId
        let bookName = this.state.bookName
        let authors = this.state.authors
        let publishedDate = this.state.publishedDate
        let bookNameError = this.state.bookNameError
        let authorsError =  this.state.authorsError
        bookName = bookName.trim()
        if(!bookName){
            bookNameError = "Book Name cannot be empty "
        }
        if(authors)authors.forEach((name,index,array)=>{array[index] = name.trim()})
        authors = authors.filter(Boolean)
        if(!authors.length){
            authorsError ="Authors cannot be empty "
        }
        if(this.props.books.find((book)=> {return (book.title === bookName && book.id !== bookId)})){
            bookNameError = "That book is already in the books list"
        }
        if(bookName && publishedDate && !bookNameError && !authorsError){
            let id = this.state.bookId
            let title = bookName
            let book = { id, title, authors, publishedDate }
            if(this.state.isEditMode){
                this.props.editBook(book)
            }
            else{
                this.props.addBook(book)

            }
            this.props.closeModal()
        }
        this.setState({bookName,authorsError,bookNameError})
    }

    render() {
        return (
            <div className="modalBackground">
                <div className='modalContainer'>
                    <div className='modalTop'>
                        <h1 className='modalTitle'>{this.state.modalTitle}</h1>
                    </div>
                    <div className='modalBottom'>
                        <div className='modalForm'>
                            <label>
                                ID
                                <input readOnly disabled value={this.state.bookId}/>
                            </label>
                            <label>Book Name
                                <input onChange={this.onChangeBookName} value={this.state.bookName}/>
                                {this.state.bookNameError?
                                      <p style={styles.ErrorStyle}>{this.state.bookNameError}</p>: ''
                                }

                            </label>
                            <label> Authors
                                <input onChange={this.onChangeAuthors} value={this.state.authors}/>
                                {this.state.authorsError?
                                    <p style={styles.ErrorStyle}>{this.state.authorsError}</p>: ''
                                }
                            </label>
                            <label>Published Date
                                <DatePicker onChange={this.onChangePublishDate} selected={moment(this.state.publishedDate)}/>
                            </label>
                        </div>
                        <div className='modalButtons'>
                            <button onClick={()=> this.props.closeModal()}>cancel</button>
                            <button onClick={()=>{this.saveButtonClicked()}}>save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
        let booksReducer = state.booksReducer
        let modalReducer = state.modalReducer
    return {
        books: booksReducer.booksList,
        currentBookId: modalReducer.currentBookId
    }
}

const mapDispathToProps = (dispatch)=>{
    return {
        closeModal: ()=>{
            dispatch(closeModal())
        },
        addBook: (newBook)=>{
            dispatch(addBook(newBook))
        },
        editBook: (bookEdited)=>{
            dispatch(editBook(bookEdited))
        }

    }
}

const styles ={
    ErrorStyle:{
        color:'red',
        margin:'0px',
    }
}


export default connect(mapStateToProps, mapDispathToProps) (Modal)