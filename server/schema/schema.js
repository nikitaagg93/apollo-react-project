const graphql = require("graphql");
const _ = require("lodash");
const Book = require('../models/book')
const Author = require('../models/author')

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema } = graphql;

// var books = [
//     {name: "The Girl With Dragon Tattoo", genre: "Murder Mystery", id: "1", authorId: "1"},
//     {name: "And Then There Were None", genre: "Murder Mystery", id: "2", authorId: "2"},
//     {name: "I Am Malala", genre: "Biography", id: "3", authorId: "3"},
//     {name: "Murder on the orient express", genre: "Murder Mystery", id: "4", authorId: "2"},
//     {name: "Crooked House", genre: "Murder Mystery", id: "5", authorId: "2"},
// ]

// var authors = [
//     {name: "Steig Larsonn", age: 54, id: "1"},
//     {name: "Agatha Christie", age: 55, id: "2"},
//     {name: "Malala", age: 57, id: "3"},

// ]

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({ authorId: parent.id});
                // return _.filter(books,{authorId: parent.id})
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId:  { type: GraphQLID },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID} },
            resolve(parent){
                console.log('parent',parent)
                return Author.findById(parent.authorId)
                // return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args){
                return Book.findById(args.id)
                // return _.find(books, {id: args.id})
            }
         },
         author: {
            type: AuthorType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args){
                return Author.findById(args.id)
                // return _.find(authors, {id: args.id})
            }
         },
         books: {
             type: new GraphQLList(BookType),
             resolve(parent,args){
                 return Book.find({});
                //  return books
             }
         },
         authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
                // return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});