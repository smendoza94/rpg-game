import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ backgroundColor: '#006633' }}>
				<Toolbar>
					<Typography variant="h5" component="div">
						<Link
							to="/"
							style={{ textDecoration: 'none', color: 'white' }}
						>
							RPG-Game
						</Link>
					</Typography>
					<Box
						alignItems="right,"
						sx={{ flexGrow: 1, textAlign: 'right' }}
					>
						<Link
							to="/signup"
							style={{
								textDecoration: 'none',
								color: 'white',
								marginRight: '15px',
							}}
						>
							Sign Up
						</Link>

						<Link
							to="/game"
							style={{
								textDecoration: 'none',
								color: 'white',
								marginRight: '15px',
							}}
						>
							Game
						</Link>

						<Link
							to="/login"
							style={{
								textDecoration: 'none',
								color: 'white',
								marginRight: '15px',
							}}
						>
							Login
						</Link>

						<Link
							onClick={localStorage.clear()}
							to="/"
							style={{
								textDecoration: 'none',
								color: 'white',
								marginRight: '15px',
							}}
						>
							Logout
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navbar;

