import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
							to="/"
							style={{
								textDecoration: 'none',
								color: 'white',
								marginRight: '15px',
							}}
						>
							Logout
						</Link>
						<Link
							to="/signup"
							style={{ textDecoration: 'none', color: 'white' }}
						>
							Sign Up
						</Link>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navbar;

