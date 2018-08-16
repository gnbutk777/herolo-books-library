import React  from 'react';
import './App.css';
import {connect} from "react-redux";
import BooksList from "./components/BooksList";
import { fetchBooks, orderBook } from './actions/booksActions'
import {openModal} from './actions/modalAction'
import loadingBook from '../src/images/loadingBook.gif'
import DeleteBookModal from "./components/DeleteBookModal";
import Modal from "./components/Modal";

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={ selectValue: 'hidden'}
    }

    handleChangeFilter= (event)=>{
        let value = event.target.value
        this.props.orderBook(value)
        this.setState({ selectValue: value })
    }

    componentWillMount(){
        this.props.fetchBooks()
    }
    renderBookList(){
        let books = this.props.books
        //console.log(books)
        return books.map((item,key)=>{
            return <BooksList  key ={key} item={item}/>
        })
    }
    renderLoadingBooks(){
        return <div className="loadingBooks">
        <img src={loadingBook} className='loading-books'/>
        <p>Loading Books</p>
        </div>
    }


    renderModals() {
        if(this.props.isModalOpened){
            return <Modal/>
        }
        if(this.props.isDeleteBookModalOpened){
            return <DeleteBookModal/>
        }
    }

  render() {
    return (
      <div className="App">
          <div className="top">
            <h1 className='app-title'>The Books Library</h1>
              <div className="menu">
                  <select value={this.state.selectValue} onChange={this.handleChangeFilter}>
                      <option value='hidden' hidden> -- select an option -- </option>
                      <option value="A-Z">A-Z</option>
                  </select>
                  <button onClick={()=> this.props.openModal()}>Add a New Book</button>
              </div>
          </div>
          <div className='booksContainer'>
              {this.props.booksIsFetched?
                  this.renderBookList():
                  this.renderLoadingBooks()
              }
          </div>
          {this.renderModals()}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    let { booksReducer, modalReducer, deleteBookModalReducer } = state
    return {
        booksIsFetched: booksReducer.booksIsFetched,
        books: booksReducer.booksList,
        isModalOpened: modalReducer.isModalOpened,
        isDeleteBookModalOpened: deleteBookModalReducer.isDeleteBookModalOpened
    }
}
const mapDispathToProps = (dispatch)=>{
    return {
        fetchBooks: (value)=>{
            dispatch(fetchBooks(value))
        },
        orderBook: (value)=>{
            dispatch(orderBook(value))
        },
        openModal: ()=>{
          dispatch(openModal())
        },
    }
}

export default connect(mapStateToProps, mapDispathToProps)(App);
