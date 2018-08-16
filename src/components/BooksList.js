import React from 'react'
import './BooksList.css'
import {connect} from "react-redux";
import { openModal } from "../actions/modalAction";
import { openDeleteBookModal } from '../actions/deleteBookModalAction'

class BooksList extends React.Component{
    render() {
        let item = this.props.item
        let id = item.id
        let title = item.title
        let authors = ''
        if(item.authors){
            authors = item.authors.length > 1 ?'Authors Names: ':'Author Name: ' + item.authors.toString()
        }
        else{
            authors = "No Author"
        }
        let publishedDate = item.publishedDate

        return (
            <div className='bookDetails'>
                <p>ID: {id}</p>
                <p>Book Name: {title}</p>
                <p>{authors}</p>
                <p>Published Date: {publishedDate}</p>
                <button onClick={()=>{this.props.openModal(this.props.item.id)}}>Edit</button>
                <button onClick={()=>{this.props.openDeleteBookModal(this.props.item.id)}}>Delete</button>
            </div>
        )
    }
}

const mapDispathToProps = (dispatch) =>{
    return {
        openModal: (item)=>{
            dispatch(openModal(item))
        },
        openDeleteBookModal:(bookId)=>{
            dispatch(openDeleteBookModal(bookId))
        }

    }
}




export default connect(null, mapDispathToProps)(BooksList)