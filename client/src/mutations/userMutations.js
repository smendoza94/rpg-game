// built these queries in graphql studio and pasted them into the front end here
import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation Mutation($userName: String!, $password: String!) {
		createUser(userName: $userName, password: $password) {
			_id
			userName
		}
	}
`;

export const LOGIN = gql`
	mutation Mutation($userName: String!, $password: String!) {
		login(userName: $userName, password: $password) {
			user {
				_id
				userName
			}
			token
		}
	}
`;

export const CREATE_FIGHTER = gql`
	mutation CreateFighter(
		$name: String!
		$health: Int!
		$attack: Int!
		$isAlive: Boolean!
	) {
		createFighter(
			name: $name
			health: $health
			attack: $attack
			isAlive: $isAlive
		) {
			_id
			name
			health
			attack
			isAlive
			enemiesDefeated
			user {
				_id
				userName
			}
		}
	}
`;