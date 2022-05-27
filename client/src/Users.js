import { useState } from 'react';
// to make queries we import useQuery, to make mutations we import useMutation
import { useQuery, useMutation } from '@apollo/client';
// anytime want routing done with react router need to use 'Link' tag to change url of page
import { Link } from 'react-router-dom';
// allows us to use the USERS queries we defined in userQueries in the app
import { USERS } from './queries/userQueries';
import { CREATE_USER } from './mutations/userMutations';
import { useAuth } from './useAuth';

export const UsersContainer = () => {
	useAuth();

	const [firstName, setFirstName] = useState('');
	const [lastName, setlastName] = useState('');

	const { loading, data, error } = useQuery(USERS);

	// can't have same variable names so renaming loading to 'createUserLoading' and renaming error to 'createUserError'
	// create variable named createUserMutation
	// call userMutation and pass in the mutation that we want to be called (CREATE_USER)
	// useMutation can also accept a second parameter, a configuration object. we use refetchQueries to call the USERS queries again and render on the page
	const [
		createUserMutation,
		{ loading: createUserLoading, error: createUserError },
	] = useMutation(CREATE_USER, {
		refetchQueries: [{ query: USERS }],
	});

	if (loading) {
		return <h1>Loading Data!</h1>;
	}

	// when you look at data in log you see that it returns the object of users
	console.log(data);

	return (
		<div>
			{/* create input field that sets value to firstName. when change is made (onChange) event (e) happens that sets variable setFirstName to the updated value of firstName (which in this case is e.target.value) */}
			{/* same thing happens for lastName */}
			<input
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				value={lastName}
				onChange={(e) => setlastName(e.target.value)}
			/>
			{/* in the curly brackets we are askign if createUserLoading is happening. if so, then to prevent users from entering multiple users while the api still being called, we hide the button and display messsage within the h1. if createUserLoading is not running, then we present the button to the user to add a user*/}
			{createUserLoading ? (
				<h1>Creating user please wait</h1>
			) : (
				<button
					onClick={async () => {
						// on click we call createUserMutation function and it takes an object as parameter –– we pass in the variables for the mutation
						// passing in variables for queries different from passing in variables in the mutations
						// these variables reference variables defined in the userMutations file in the mutations directory
						await createUserMutation({
							variables: { firstName, lastName },
						});
					}}
				>
					Add User
				</button>
			)}

			{data.users.map((user) => {
				return (
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<h1>{user.fullName}</h1>
						<Link to={`/users/${user._id}`}>View Profile</Link>
					</div>
				);
			})}
		</div>
	);
};
