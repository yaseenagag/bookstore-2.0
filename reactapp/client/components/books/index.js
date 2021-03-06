import React, { Component } from 'react'
import Book from '../book/index'
import AddBook from '../addBook/addBook'

export default class Books extends Component{
  constructor(){
    super()
    this.state = {
      books: [],
      showFormNow:false
    }
 }

  componentDidMount(){
    this.fetchBook()
  }


  fetchBook(){
    const options = {
      method:'GET',
      mode:'cors',
      headers: new Headers({
      'Accept':'application/json,application/xml, text/plain,text/html, *.*',
      'Content-Type': 'application/json',
        }),
      credentials: 'same-origin'
      }
    fetch('http://localhost:3000/api/books', options)
      .then( data => {
        return data.json()
      })
      .then( books => {
        this.setState({
            books: books
      })
    })
    .catch( err => {
      console.log('Error loading tasks', err);
      return err
      })
    }


  showFormNow(){
    this.setState({showFormNow:true})
  }

  hideFormNow(){
    this.setState({showFormNow:false})
  }

  render(){
    const books = this.state.books
    const booksJSX = books.map((book, key )=> <Book key={key} fetchBook={this.fetchBook.bind(this)} book={book} />)

    return this.state.books.length == 0 ? <div> Loading data </div>
    : <div className="mainContainer">{booksJSX}

    <button onClick={this.showFormNow.bind(this)} className="add_Book" type="button" >Add Book</button>

    {this.state.showFormNow ? <AddBook hideFormNow={this.hideFormNow.bind(this)}/> : null}
    </div>
  }
}
