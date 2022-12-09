import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
//making sure appollo set up on client side
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, } from '@apollo/client';

//set context for storing JWT in header
import { setContext } from '@apollo/client/link/context';

//making sure client know to reach out to graphQL
const httpLink = createHttpLink({
  uri: '/graphql',
  // uri: "http://localhost:3001/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  //storing an getting JWT for valication
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//wrapping Provider for whole app/ changing to client side routing
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
