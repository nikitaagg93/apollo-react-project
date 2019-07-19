const { ApolloServer, gql  } = require('apollo-server-express');
;

const express  = require('express');
require('./config');

const Book = require('../models/book')
const Author = require('../models/author')
  
const typeDefs = gql`
    type Book {
        id: ID!
        name: String!
        genre: String!
        authorId: ID!
        author: Author       
    }
    type Author {
        id: ID!
        name: String!
        age: Int!
        books: [Book]
    }
    type Query {
        books: [Book]
        book(id: ID!): [Book]
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addBook(name: String!, genre: String!,authorId: ID!): Book
    }
`;

const resolvers = {
    Query: {
        books: async () => await Book.find({}).exec(),
        author: async (parent, args) => await Author.find({ _id: args.id}).exec(),
        book: async (parent, args) => await Book.find({_id: args.id}).exec(),
        authors: async () => await Author.find({}).exec(),
    },
    Mutation: {
        addBook: async (_, args) => {
            try {
                let response = await Book.create(args);
                return response;
            } catch(e) {
                return e.message;
            }
        }
    },
    Book:{
        author: async (parent) =>  await Author.findById(parent.authorId).exec()
    },
    Author: {
        books: async (parent) => await Book.find({authorId: parent.id}).exec()
    }
};

  
  // Initialize the app
const server = new ApolloServer({ 
    typeDefs, 
    resolvers
 });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4005 }, () =>
  console.log(`🚀 Server ready at http://localhost:4005${server.graphqlPath}`)
);