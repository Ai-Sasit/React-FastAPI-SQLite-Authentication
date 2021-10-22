import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import MoreIcon from "@mui/icons-material/MoreVert";
import * as React from "react";
import { getUser, logout } from "../service/auth";
import { Redirect } from "react-router";

export default function PrimarySearchAppBar(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [Auth, setAuth] = React.useState(true);
  const [User, setUser] = React.useState(Object);

  const theme = createTheme({
    palette: {
      success: {
        main: '#fff',
      },
    },
  });
  

  React.useEffect(() => {
    getUser()
      .then((data: any) => {
        setUser(data);
        setAuth(data.is_superuser);
      })
      .catch((error: any) => {
        window.location.replace("/");
      });
  }, []);

  const signout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setAuth(false);
    logout();
    window.location.replace("/");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const backtohome = () =>{
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.replace("/");
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={backtohome}>Home</MenuItem>
      <MenuItem onClick={signout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={backtohome}>Home</MenuItem>
      <MenuItem onClick={signout}>Logout</MenuItem>
    </Menu>
  );
  return typeof Auth!=="undefined"&& !Auth?<Redirect to="/"/>:(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#0A1929" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Dashboard | Administrator
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              aria-controls={menuId}
              color="success"
              onClick={handleProfileMenuOpen}
              startIcon={<PersonIcon/>}
            >
              {User.username}
            </Button>
          </ThemeProvider>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
