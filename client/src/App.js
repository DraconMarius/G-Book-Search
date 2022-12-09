import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
//making sure appollo set up on client side
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

//making sure client know to reach out to graphQL
const client = new ApolloClient({
  url: '/graphql',
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
            <Route path='/' element={<SearchBooks />} />
            <Route path='/saved' element={<SavedBooks />} />
            {/* <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
