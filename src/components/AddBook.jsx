import React, {Component} from 'react';
import { graphql, compose, Query, Mutation } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';


class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorId: ""
        }
    }
    displayAuthors(){
        // const { getAuthorsQuery: { loading, authors } } = this.props;
        // if(loading) {
        //     return (
        //         <option disabled> Loading ..... </option>
        //     );
        // } else {
        //     return authors.map((author)=> {
        //          return (
        //              <option key={author.id} value={author.id}>
        //                  {author.name}
        //              </option>
        //          )
        //     })
        // }
        return (<Query query={getAuthorsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                                data.authors.map((book)=> {
                                return (
                                    <option key={book.id} value={book.id}>
                                        {book.name}
                                    </option>
                                )
                            })
                    );
                    }}
            </Query>);


    }

    addBook = (event) =>{
        event.preventDefault();
        console.log('this state on submit', this.state);

        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [ {
                query: getBooksQuery
            }]
        });

    }
    render(){
        console.log('this.props', this.props)
        let name, authorId, genre;
        return (
        <Mutation mutation={addBookMutation}>
            {
            (addBook, { data }) => (
            <form
                onSubmit={e => {
                e.preventDefault();
                console.log('e',e.target)
                console.log('vars', name, authorId.value, genre)
                addBook({ 
                    variables: {
                        name: name.value,
                        genre: genre.value,
                        authorId: authorId.value
                    },
                    refetchQueries: [ {
                        query: getBooksQuery
                    }]
                });
                name.value = "";
                authorId.value=""
                genre.value=""
                }}
            >
                <fieldset>
                    <legend>Add Book</legend>
                    <div>
                        <label>Book Name:</label>
                        <input type="text" ref={node => {
                            name = node;
                        }}/>
                    </div>
                    <div>
                        <label>Genre :</label>
                        <input type="text" ref={node => {
                            genre = node;
                        }}/>
                    </div>
                    <div>
                        <label>Author :</label>
                        <select ref={node => {
                            authorId = node;
                        }}>
                            <option> Select Author</option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button type="submit">Add Book</button>
                </fieldset>
            </form>
        )}
        </Mutation>
            // <form onSubmit={this.addBook}>
            //     <div>
            //         <label>Book Name:</label>
            //         <input type="text" onChange={ (e) => this.setState({name: e.target.value})}/>
            //     </div>
            //     <div>
            //         <label>Genre :</label>
            //         <input type="text" onChange={ (e) => this.setState({genre: e.target.value})}/>
            //     </div>
            //     <div>
            //         <label>Author :</label>
            //         <select onChange={ (e) => this.setState({authorId: e.target.value})}>
            //             <option> Select Author</option>
            //             {this.displayAuthors()}
            //         </select>
            //     </div>
            //     <button >+</button>
            // </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)
// export default graphql(getAuthorsQuery)(AddBook);



