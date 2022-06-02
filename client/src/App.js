import { Routes, Route } from 'react-router-dom';
import { About } from './About';
import { Home } from './Home';
import { SingleUser } from './SingleUser';
import SignUp  from './Signup';
import Login from './Login';
import Logout from './Logout';
import Game from './Game';
import Navbar from './Navbar';
// import './style.css';

function App() {
    return (
    
		<div>    
            <Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/about" element={<About />} />
				<Route path="/game" element={<Game />} />
				<Route path="/users/:userId" element={<SingleUser />} />
			</Routes>
		</div>
	);
}

export default App;
