import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthContext/AuthContext';
import { CartContext } from '../../CartContext/CartContext';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
  Badge
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./icons/logo.svg";
import DarkModeToggle from "../../DarkModeToggle/DarkModeToggle";
import SearchIcon from "./icons/SearchIcon.svg";
import './HeaderStyle.css';
import Search from '../../Search/Search';

const HeaderLayout = () => {
  const { usuario, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [show, setShow] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);


  const handleClick = () => {
    console.log("Mostrar / Ocultar elemento", !show);
    setShow(!show);
    setShowUserActions(false); // Oculta la sección de iconos de usuario cuando se hace clic en la lupa
  };

  const changeShow = () => {
    setShow(!show);
  };

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowUserActions(false); // Oculta la sección de iconos de usuario cuando se cierra el menú de usuario

  };

  const handleLogin = () => {
    handleClose();
    navigate("/login");
  };

  const handleSignUp = () => {
    handleClose();
    navigate('/signup');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box component="header" className={`Navbar ${show ? 'search-active' : ''}`}>  
      {!show && (
        <>
      <Box className="logo-container">
        <Link to="/">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>
      </Box>

      <Box component="nav" className={`navLink ${isMobile ? 'hidden' : ''}`}>
        <span onClick={() => navigate("/store")}>Tienda</span>
        <span onClick={() => navigate("/categories")}>Categorías</span>
        <span onClick={() => navigate("/faqs")}>FAQs</span>
        <span onClick={() => navigate("/contact")}>Contacto</span>
      </Box>
      </>
      )}
      <Box className="user-actions">
        <img src={SearchIcon} alt="Buscar" className="actionIcon" onClick={handleClick} />
        {show && <Search />}
        {!show && (
        <>
        <DarkModeToggle />
        <IconButton color="inherit" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
            <FontAwesomeIcon icon={faShoppingCart} style={{ color: '#CC2D4A' }} />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleUserIconClick} style={{ color: '#CC2D4A' }}>
          {usuario ? (
            <Avatar style={{ backgroundColor: '#CC2D4A', color: 'white' }}>
              {usuario.nombre.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
        </IconButton>
        </>
        )}
        {isMobile && (
          <IconButton className="menu-button" onClick={toggleDrawer(true)}>
            <MenuIcon style={{ color: '#CC2D4A' }} />
          </IconButton>
        )}

<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  {usuario ? (
    <>
      <MenuItem
        onClick={() => {
          // Agrega la lógica para navegar a la página de editar perfil
          handleClose();
        }}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Editar perfil
      </MenuItem>
      <MenuItem
        onClick={() => {
          // Agrega la lógica para navegar a la página de favoritos
          handleClose();
        }}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Favoritos
      </MenuItem>
      <MenuItem
        onClick={() => {
          // Agrega la lógica para navegar a la página de mis pedidos
          handleClose();
        }}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Mis pedidos
      </MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Cerrar sesión
      </MenuItem>
    </>
  ) : (
    <>
      <MenuItem
        onClick={handleLogin}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Iniciar sesión
      </MenuItem>
      <MenuItem
        onClick={handleSignUp}
        sx={{
          fontFamily: "Poppins",
          fontWeight: 600,
          color: "#CC2D4A",
          "&:hover": {
            color: "#8FA206"
          },
          "&:active": {
            color: "white",
            backgroundColor: "#8FA206"
          },
        }}
      >
        Crear cuenta
      </MenuItem>
    </>
  )}
</Menu>

      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem
            button
            onClick={() => {
              navigate("/store");
              toggleDrawer(false)();
            }}
          >
            <ListItemText primary="Tienda" className="drawer-menu-item" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/categories");
              toggleDrawer(false)();
            }}
          >
            <ListItemText primary="Categorías" className="drawer-menu-item"/>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/faqs");
              toggleDrawer(false)();
            }}
          >
            <ListItemText primary="FAQs" className="drawer-menu-item" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/contact");
              toggleDrawer(false)();
            }}
          >
            <ListItemText primary="Contacto" className="drawer-menu-item" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default HeaderLayout;
