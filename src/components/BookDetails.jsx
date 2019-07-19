import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { getBookDetailsQuery } from '../queries/queries';


export default class BookDetails extends Component {

    render(){
        console.log('id', this.props.id)
        console.log('data', this.props.data)
        // const { books } = this.props.data;
        return (
        <>
            <Query query={getBookDetailsQuery} variables={{ id: this.props.id }}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;
                    console.log('data',data)
                    if(!data.book) return null;
                    
                    const { name, genre, author } = data.book[0];
                    return (
                        <fieldset>
                            <legend>Book Details</legend>
                            
                            Name: {name}
                            <br/>
                            Genre: {genre}

                            <br/>

                            Author Details:
                            <ol>
                                <li>Name: {author.name}</li>
                                <li>Age: {author.age}</li>
                                <li>Books:
                                <ul>
                                    {author.books.map((b) => {
                                        return (
                                            <li key={b.id}>{b.name}</li>
                                        )
                                    }

                                    )}
                                </ul>
                                </li>
                            </ol>
                        </fieldset>
                    );
                    }}
            </Query>
        </>);
    }
}


// export default graphql(getBookDetailsQuery,
//     options: (props) => {
//         return: {

//         }
//     }
//     )(BookDetails);



