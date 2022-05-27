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
			<h1>Username</h1>
			<p>{user.userName}</p>
			<h1>Fighter</h1>
			<p>{user.fighter}</p>
		</div>
	);
};