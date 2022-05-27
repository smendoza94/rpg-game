const { gql } = require("apollo-server-express");

// define typeDegs inside gql function
// here declare what information users can get from database
const typeDefs = gql`
	type User {
		_id: ID!
		userName: String
		fighter: Fighter
	}

	type Fighter {
		_id: ID!
		name: String
		health: Int
		attack: Int
		enemiesDefeated: Int
		isAlive: Boolean
		user: User
	}

	type Enemy {
		_id: ID!
		health: Int
		attack: Int
		isAlive: Boolean
	}

	type Auth {
		user: User
		token: String
	}

	type Query {
		users: [User]
		user(id: String!): User
		fighters: [Fighter]
		fighter: Fighter
		enemies: [Enemy]
		enemy: Enemy
	}

	type Mutation {
		login(userName: String!, password: String!): Auth
		createUser(userName: String!, password: String!): User
		createFighter(name: String!, health: Int!, attack: Int!, isAlive: Boolean!): Fighter
	}
`;

module.exports = typeDefs;
