import { Appbar, Toolbar, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<Box sx={{flexGrow: 1}}>
			<Appbar position='static'>
				<Typography variant='h5' component='div'>
					<Link to='/'>Login</Link>
				</Typography>
			</Appbar>
		</Box>
	);
}

export default Navbar; 