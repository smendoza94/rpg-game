import { Routes, Route, Link } from 'react-router-dom';
import { About } from './About';
import { Home } from './Home';
import { UsersContainer } from './Users';
import { SingleUser } from './SingleUser';
import Login from './Login';
import Logout from './Logout';
import Navbar from './Navbar';

function App() {
	return (
        <div>
            <Navbar />
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/logout">Logout</Link>
            <Link to="/about">About</Link>
            <Link to="/users">Users</Link>
            <Link to="/navbar">navbar</Link>
			{/* inside of route declare every route we want in front end. what should render when url matches route */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/navbar" element={<Navbar />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/about" element={<About />} />
				<Route path="/users" element={<UsersContainer />} />
				<Route path="/users/:userId" element={<SingleUser />} />
			</Routes>
		</div>
	);
}

export default App;
