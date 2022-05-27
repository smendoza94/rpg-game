import { useParams } from 'react-router-dom';
import { useState, }  from 'react';
import { useQuery } from '@apollo/client';
import { USER } from './queries/userQueries';
export const SingleUser = () => {
	const [ user, setUser ] = useState({});
	const params = useParams();
	const {
		loading,
		error,
	} = useQuery(USER, {
		variables: { id: params.userId },
		onCompleted: (data) => {
			setUser(data.user);
		}
	});

	if (loading) {
		return <h1>Loading please wait......</h1>
	}


	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<h1>First Name</h1>
			<p>{user.firstName}</p>
			<h1>Last Name</h1>
			<p>{user.lastName}</p>
			<h1>Full Name</h1>
			<p>{user.fullName}</p>
		</div>
	);
};