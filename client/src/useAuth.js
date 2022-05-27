import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// in every component that needs authentication we can paste our custom 'useAuth' hook to check for that
export const useAuth = () => {
	// next 6 lines assign token from header to token variable. then we assign function useNavigate to variable navigate. if no token is found then we use navigate to send user to home page
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/');
		}
	}, []);
};
