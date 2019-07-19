import { gql } from 'apollo-boost';

export const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
` 

export const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

export const getBookDetailsQuery = gql`
    query($id: ID!){
        book(id: $id){
            id
            name
            genre
            authorId
            author{
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

// export const getBookDetailsQuery = gql`
//     query($id: ID!){
//         book(id: $id){
//             id
//             name
//             genre
//         }
//     }
// `



//---------------Mutations---------------------


export const addBookMutation = gql`
    mutation ( $name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`