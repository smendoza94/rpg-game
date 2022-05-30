import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from './mutations/userMutations';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const nav = useNavigate();
	const routeChange = () => {
		let path = `/`;
		nav(path);
	}; 
	const [userNameInput, setUserNameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [loginMutation] = useMutation(LOGIN, {
		onCompleted: (data) => {
			console.log(data);
			localStorage.setItem('token', data.login.token);
			nav('/home', { replace: true });
		}
	});

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '50%',
			}}
		>
			<input
				placeholder="Username"
				value={userNameInput}
				onChange={(e) => setUserNameInput(e.target.value)}
			/>

			<input
				placeholder="Password"
				type="password"
				value={passwordInput}
				onChange={(e) => setPasswordInput(e.target.value)}
			/>

			<button
				onClick={async () => {
					await loginMutation({
						// variables need to match up variables we defined in userMutations for the LOGIN mutation
						variables: {
							userName: userNameInput,
							password: passwordInput,
						}
					});
					routeChange();
				}}
			>
				Login
			</button>
		</div>
	);
};

export default Login;

