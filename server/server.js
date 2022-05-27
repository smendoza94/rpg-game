const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

// graphql will create an endpoint to POST /graphql where it will utilize our resolvers

const { typeDefs, resolvers } = require('./schemas');

const { secret } = require('./common/vars');

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/rpg-game').then(() => {
	console.log('successfully connected to rpg-game db');
});

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	// this function wil be called in every single query/mutation that goes through our graphql api first
	// we'll use it to check if there is a token in the header of the request
	// whatever we return from context will be available in the 'context' parameter in all of our queries and mutations
	context: async ({ req }) => {
		let token = req.headers.authorization;
		// What our jwt looks like in the header "Bearer asjhdgasoydgasoydgasdoyagdaoudgasdoyadassa"
		if (token) {
			// splits the header token into an array and grab the second element, which is jwt
			// [ "Bearer", "asjhdgasoydgasoydgasdoyagdaoudgasdoyadassa" ]
			token = token.split(' ')[1].trim();
		}

		if (!token) {
			return req;
		}
		try {
			const user = jwt.verify(token, secret);
			// attach to the request a user property and that user property is the user that is returned from the request
			console.log(user);
			req.user = user;
		} catch (e) {
			console.log('invalid token', e);
		}

		return req;
	},
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this actually starts the apollo server with our typeDefs and resolvers
// hook it up as middleware to use graphql endpoints. pass in app express server object. in this case we named our express server app so only need to pass in 'app' instead of 'app: app'
const startServer = async () => {
	await apolloServer.start();

	apolloServer.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log('app is running  on PORT', PORT);
		console.log(
			`graphql endpoint is on http://localhost:${PORT}${apolloServer.graphqlPath}`
		);
	});
};

// startServer returns a promise. we resolve the promise below
// if the apollo server breaks (typeDefs/resolvers don't work) we log that here
startServer()
	.then(() => {
		console.log('hello');
	})
	.catch((e) => {
		console.log(e);
	});
