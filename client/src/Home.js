import { useAuth } from './useAuth';

export const Home = () => {
	useAuth();
	return (
		<div>
			<p>
				Thank you for visiting RPG-Game. You must create an account to
				play. If you already have an account please sign in.
			</p>
			<p>
				This game was proudly developed by Cullen, David, Josue, and
				Steven.
			</p>
			<p>
				More features will be added once we are rich! Please donate (XRP
				preferred).
			</p>
		</div>
	);
};

export default Home;
