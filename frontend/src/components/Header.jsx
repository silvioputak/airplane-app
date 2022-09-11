import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import {Link} from 'react-router-dom'

const pages = ['Countries', 'Airlines', 'Airport'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
        console.log("Handle1")
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        console.log("Handle2")
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
        console.log("Handle3")
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
        console.log("Handle4")
      setAnchorElUser(null);
    };
  
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalAirportIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AIRPLANE APP
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <Link to='/countries' style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Countries</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='/airlines' style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Airlines</Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to='/airports' style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">Airports</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <LocalAirportIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AIRPLANE APP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/countries' style={{ textDecoration: 'none' }}>
              <Button
                    key="Countries"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Countries
              </Button>
            </Link>
            <Link to='/airlines' style={{ textDecoration: 'none' }}>
              <Button
                    key="Airlines"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Airlines
              </Button>
            </Link>
            <Link to='/airports' style={{ textDecoration: 'none' }}>
              <Button
                    key="Airports"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Airports
              </Button>
            </Link>
              
            </Box>
  
          </Toolbar>
        </Container>
      </AppBar>
    );
}

export default Header