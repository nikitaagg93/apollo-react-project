import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails'


export default class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookId: ""
        }
    }
    displayBooks(){
        const { data } = this.props;
        if(data.loading) {
            return (
                <div> Loading ..... </div>
            );
        } else {
            return data.books.map((book)=> {
                 return (
                     <li key={book.id}>
                         {book.name}
                     </li>
                 )
            })
        }


    }
    render(){
        console.log('this.props', this.props)
        console.log('bookId',this.state.bookId)
        return (
        <>
            <ul id="book-list">
            <Query query={getBooksQuery}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                                data.books.map((book)=> {
                                return (
                                    <li
                                    key={book.id} 
                                    onClick={
                                        (e) => this.setState({bookId: book.id})
                                    }
                                    >
                                        {book.name}
                                    </li>
                                )
                            })
                    );
                    }}
            </Query>
                {/* {this.displayBooks()} */}
            </ul>
             <BookDetails id={this.state.bookId}/>       
        </>);
    }
}


// export default graphql(getBooksQuery)(BookList);



