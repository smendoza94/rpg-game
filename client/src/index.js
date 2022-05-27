import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// we are destructuring Browser Router from react-router-dom and the nenaming it as Router
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';


// sets up where graphql query/mutation will go
const httpLink = createHttpLink({
	uri: '/graphql',
});

// will setup the headers for every query/mutation that is going to the backend
// 1st param is a config object (not using in this case)
// 2ns param is the request object that we send out, and we are pulling out the headers object from that param
// this grabs token and attaches it to the headers
const authLink = setContext((_, { headers }) => {
	// going into localStorage and retrieving token
	const token = localStorage.getItem('token');

	// whatever we return her ewill be the object attacked to the request that is sent to the backend
	return {
		headers: {
			// graphql attaches extra props to headers. here we are keeping them and passing authorization
			// authorization checks if token exists. if so, first word is Bearer and the token string is second.
			// if no token is present then set to empty string
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// these are the rules that apolloclient will follow when a request goes through
// before going through httpLink we go through authLink
// once go through authLink we go through httpLink which forwards us to uri '/graphql'
// cache, we are using InMemoryCache that is built in by default
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// any react component wrapped within ApolloProvider will be forwarded to the endpoint we defined using the client we defined above using ApolloClient
	// to take care of routing we wrap App component withing router tags
	<ApolloProvider client={client}>
		<Router>
			<App />
		</Router>
	</ApolloProvider>
);
