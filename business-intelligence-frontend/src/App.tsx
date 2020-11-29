import React from 'react';
import './App.css';
import { BrowserRouter, Router, useLocation } from 'react-router-dom';
import { RoutingHandler } from './RoutingHandler';
import { SessionContextProvider } from './context/SessionContext';
import history from './history';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


interface LocationState {
  from:{
    pathname: string
  }
}


const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

function App() {

  return (
    <BrowserRouter>
    <ApolloProvider client={client}>
    <SessionContextProvider>
     <RoutingHandler />
     </SessionContextProvider>
     </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
