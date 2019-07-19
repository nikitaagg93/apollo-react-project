import React from 'react';
import BookList from './components/BookList'
import AddBook from './components/AddBook';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  // uri: "http://localhost:3009/graphql"
  uri: "http://localhost:4005/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <h3>Reading List</h3>
          <BookList/>
          <hr/>
          <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
