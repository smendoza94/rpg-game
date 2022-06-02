import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './mutations/userMutations';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const nav = useNavigate();
	const routeChange = () => {
		let path = `/`;
		nav(path);
	};
	const [userNameInput, setUserNameInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');

	const [signupMutation] = useMutation(CREATE_USER, {
		onCompleted: (data) => {
			console.log(data);
			// localStorage.setItem('token', data.login.token);
			// nav('/home', { replace: true });
		},
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
					await signupMutation({
						// variables need to match up variables we defined in userMutations for the LOGIN mutation
						variables: {
							userName: userNameInput,
							password: passwordInput,
						},
					});
					routeChange();
				}}
			>
				Create Account
			</button>
		</div>
	);
};

export default SignUp;