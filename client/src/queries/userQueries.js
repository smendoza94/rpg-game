// built these queries in graphql studio and pasted them into the front end here
import { gql } from '@apollo/client';


export const USERS = gql`
	query Query {
		users {
			_id
			userName
			fighter {
				name
				health
				attack
				enemiesDefeated
				isAlive
			}
		}
	}
`;

export const USER = gql`
	query Query($id: String!) {
		user(id: $id) {
			_id
			userName
		}
	}
`;
