import React, { Component } from 'react';
import './App.css';
import BooksList from "./components/BooksList";

class App extends Component {

    renderBookList(){
        let books = ['aaaaa','bbbbbb','cccccc','dddd','eeee','fffff']
        return books.map(()=>{
            return <BooksList/>
        })
        // return books

    }
  render() {
    return (
      <div className="App">
          <h1 className={'app-title'}>The Books Library</h1>
          <div className={'booksContainer'}>
              {this.renderBookList()}
          </div>
      </div>
    );
  }
}

export default App;
