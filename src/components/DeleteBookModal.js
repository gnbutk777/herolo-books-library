import React from 'react'
import './DeleteModal.css'
import { connect } from "react-redux";
import { deleteBook } from "../actions/booksActions";
import { closeDeleteBookModal } from '../actions/deleteBookModalAction'

class DeleteBookModal extends React.Component{


    deleteBook=()=>{
        this.props.deleteBook(this.props.currentBookId)
        this.props.closeDeleteBookModal()
    }
    cancelModal=()=>{
        this.props.closeDeleteBookModal()
    }
    render() {
        return (
            <div className="modalBackground">
                <div className='deleteBookModalContainer'>
                    <div className='deleteBookModalTop'>
                        <h1 className='deleteBookModalTitle'>Are you sure you want to delete this book?</h1>
                    </div>
                    <div className='deleteBookModalBottom'>
                        <div className='deleteBookModalButtons'>
                            <button onClick={this.cancelModal}>cancel</button>
                            <button onClick={this.deleteBook}>ok</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
        let { currentBookId } = state.deleteBookModalReducer
    return { currentBookId }
}
const mapDispathToProps = (dispatch)=>{
    return {
        closeDeleteBookModal: ()=>{
            dispatch(closeDeleteBookModal())
        },
        deleteBook: (bookId)=>{
            dispatch(deleteBook(bookId))
        }

    }
}



export default connect(mapStateToProps, mapDispathToProps) (DeleteBookModal)