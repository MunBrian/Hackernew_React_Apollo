import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";

// import all dependencies from apollo client
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// httplink to connect ApolloClient to GraphQl API
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

// instantiate ApolloClient
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// render the root component, pass client prop
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
