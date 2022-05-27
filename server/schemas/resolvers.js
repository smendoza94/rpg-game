// AuthenticationError is built in contructor from apollo for user authentication
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiration } = require('../common/vars');

const {
	User,
	Fighter,
} = require('../db');

// we make our resolvers based on our typeDefs. BEST PRACTICE to make typeDefs first and then the resolvers


const resolvers = {
	// when the query is called this function will run
	Query: {
		fighters: async () => {
			try {
				return await Fighter.find({});
			} catch (e) {
				throw new Error(e);
			}
		},
		users: async (root, args) => {
			try {
				return await User.find({});
			} catch (e) {
				throw new Error(e);
			}
		},
		user: async (root, { id }) => {
			try {
				return await User.findById(id);
			} catch (e) {
				throw new Error(e);
			}
		},
	},
	// when a mutation is called this function will run
	// rememeber: anytime doing something other than making a GET request, we are making a Mutation (i.e. login)
	Mutation: {
		createFighter: async (root, { name, health, attack, isAlive }, context) => {
			if (!context.user) {
				throw new AuthenticationError(
					"You must be logged in to create a fighter"
				);
			}

			try {
				return await Fighter.create({
                    name,
                    health,
                    attack,
                    isAlive,
					// context is the request object
					// .user is the jwt that is defined in the server.js file
					// _id is the id of the user making the request that is in the jwt in the header of the request
					userId: context.user._id,
				});
			} catch (e) {
				throw new Error(e);
			}
		},
		createUser: async (root, { userName, password }) => {
			console.log(arguments);
			try {
				return await User.create({ userName, password });
			} catch (e) {
				throw new Error(e);
			}
		},

		// in typeDefs we defined a login mutation to return an Auth object with a token string and User object. NEED to resolve this in the mutation
		// context is something we can inkect into every query in resolvers. can be used to store databses
		// We'll use to store User object in context object so we can track id of user making incoming request so we can track which user makes which todo
		login: async (root, { userName, password }, context) => {
			try {
				const foundUser = await User.findOne({ userName });

				// if no user found with the given first name don't need to compare passwords since user does not exist
				if (!foundUser) {
					throw new AuthenticationError(
						"No user found with this first name"
					);
				}

				// compare password provided with the password for the user.
				// returns a boolean
				const isCorrectPassword = await bcrypt.compare(
					password,
					foundUser.password
				);

				if (!isCorrectPassword) {
					throw new AuthenticationError("Incorrect Password");
				}

				// if user makes it to this point means that first name is correct and password is correct, so we return Auth object and generate JWT
				// .sign takes three parameters
				// 1st is payload (what data we want to include in token)
				// in this case we are creating a plain object to work with apollo
				// 2nd is secret used to encrypt the password
				// 3rd is config obje`ct which we can used to set expiration of jwt (which we pulled from our common/vars file )
				// this returns a string
				const token = jwt.sign(
					{ _id: foundUser.id, firstName: foundUser.firstName },
					secret,
					{ expiresIn: expiration }
				);

				// here we return the token string and User object that we have defined in the typdefs
				return {
					token,
					user: foundUser,
				};
			} catch (e) {
				throw new Error(e);
			}
		},
	},
	// User is a field resolver. Field resolvers use root
	// to know what root is look at what the left most type that uses it.
	//  in this case, root is User from typeDefs
	User: {
		userName: (root) => {
			return `${root.userName}`;
		},
		fighter: async (root) => {
			try {
				// to find todos of a user find all the todos that match the id of the user 
				return await Fighter.find({ userId: root._id })
			} catch (e) {
				throw new Error(e);
			}
		}
	},
	// remember root will be the thing on the left (i.e. root will be Todo)
	Fighter: {
		user: async (root) => {
			try {
				return await User.findById(root.userId);
			} catch (e) {
				throw new Error(e);
			}
		},
	},
}; 

module.exports = resolvers; 
