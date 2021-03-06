import * as React from 'react';
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import logo from "../../logo2.png";
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { Outlet, Link } from "react-router-dom";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '50ch',
      },
    },
  },
}));

const pages = ['consulter offre'];
const settings = ['Compte', 'Parametres'];

const Mainbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [connecte, setConnecte] = React.useState(false);
  const [User, setUser] = React.useState({});
  const [modalShowReg, setModalShowReg] = React.useState(false);
  const [modalShowLog, setModalShowLog] = React.useState(false);
  const conn = false;
  const [nbrNotification,setNbrnotification ]=React.useState(notifications.length);
  localStorage.setItem(false, conn);


  useEffect(() => {
    socket?.on("getNotifocation", (data => {
      setNotifications((prev) => [...prev, data]);
    }));
  }, [socket]);
  console.log(notifications);
  const handleConnection = (u) => {
    setConnecte(true);
    setUser(u)
  }
  const persistConnection = () => {
    localStorage.setItem(true, conn);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const displayNotification = () => {
    return (
      <span className="notification">{`Votre demende est accepter.`}</span>
    );
  };

  const handleCloseUserMenu = (setting, event) => {
    setAnchorElUser(null);
    switch (setting) {
      case 'Se deconnecter': { setConnecte(false); localStorage.setItem(false, conn); break; }
      default: break;
    }
  };
  return (
    <>
      <AppBar position="static" style={{ background: '#131313', opacity: 0.8 }} >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Box
                component="img"
                sx={{
                  height: 75,

                }}
                alt="Your logo."
                src={logo}
              />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/*<Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>*/}
            </Box>
            {connecte === false
              ?

              <>

                <Button color="inherit" onClick={() => setModalShowReg(true)}>S'inscrire</Button>
                <RegisterModal show={modalShowReg} onHide={() => setModalShowReg(false)} />
                <Button style={{
                  borderRadius: 35,
                  backgroundColor: "#ff8800",
                  fontSize: "18px"
                }}
                  variant="contained"
                  onClick={() => setModalShowLog(true)} >Se connecter</Button>
                <LoginModal updateconnection={handleConnection} show={modalShowLog} onHide={() => setModalShowLog(false)} socket={socket} />
              </>
              :
              <>

                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    component={Link} to={'/Poster'} state={{ from: User.id }}
                    key="poster offre"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Poster offre
                  </Button>
                  <Button
                    component={Link} to={'/Chercher'} state={{ from: User.id }}
                    key="offres"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    consulter offres
                  </Button>

                  <Button
                    component={Link} to={'/Mesoffres'} state={{ from: User.id }}
                    key="mesoffres"
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Mes offres
                  </Button>
                  {open && ( 
                    <div className="notifications">
                      {notifications.map(() => displayNotification())}
                      {<button className="nButton">
                        Mark as read
                      </button> }
                    </div>
                  )}
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={0} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={notifications.length} color="error" onClick={() => {setOpen(!open);
                    }}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar {...stringAvatar(User.nom + " " + User.prenom)} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem component={Link} to={'/Profil'} state={{ from: User.id }}>Profil</MenuItem>
                      <MenuItem key="liste des travaux"  component={Link} to={'/ListeTravaux'}  state={{ from: User.id }} onClick={event => handleCloseUserMenu("liste des travaux", event)}>
                        <Typography textAlign="center">liste des travaux </Typography>
                      </MenuItem>
                    <MenuItem key="Se deconnecter" component={Link} to={'/'} onClick={event => handleCloseUserMenu('Se deconnecter', event)}>
                      <Typography textAlign="center">Se deconnecter</Typography>
                    </MenuItem>
                  </Menu>

                </Box></>}

          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />

    </>
  );
};
export default Mainbar;
