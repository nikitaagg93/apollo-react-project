const express = require("express");
const graphqlHTTP = require('express-graphql'); 
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


//allow cross origin request

app.use(cors())

mongoose.connect("mongodb+srv://admin:adminPass@cluster0-uvkfp.mongodb.net/test?retryWrites=true&w=majority")
mongoose.connection.once('open', ()=>{
    console.log('Connected to DB')
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(3009,()=>{
    console.log("now listening for requests on port 3009")
})