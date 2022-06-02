import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const nav = useNavigate();
	const routeChange = () => {
		let path = `/`;
		nav(path);
	};

	const logout = () => {
		localStorage.clear();
		window.location.href = '/';
	};

	return (
		<div>
			<button
				onClick={
					logout()
				}
			>
				Logout
			</button>
		</div>
	);
};

export default Logout;