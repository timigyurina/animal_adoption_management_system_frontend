import { useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import PetsIcon from '@mui/icons-material/Pets';
import Navlinks from "./Navlinks";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from '@mui/icons-material/Badge';
import PersonalNavlinks from "./PersonalNavlinks";
import EmployeeNavlinks from "./EmployeeNavlinks";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElEmployee, setAnchorElEmployee] = useState(null);
  const auth = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenEmployeeMenu = (event) => {
    setAnchorElEmployee(event.currentTarget);
  };
  const handleCloseEmployeeMenu = () => {
    setAnchorElEmployee(null);
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Adopt-US
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Navlinks isMobile />
            </Menu>
          </Box>
          <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Adopt-US
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Navlinks />
          </Box>

          {/* Menu for Employees */}
          {auth.isLoggedIn &&
            auth.userRoles.some(
              (r) => ["Administrator", "ShelterEmployee"].indexOf(r) >= 0
            ) && (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open Shelter-related data">
                    <IconButton onClick={handleOpenEmployeeMenu} sx={{ p: 0, mr:1 }}>
                      <BadgeIcon sx={{ color: "white", }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElEmployee}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElEmployee)}
                    onClose={handleCloseEmployeeMenu}
                  >
                    <EmployeeNavlinks />
                  </Menu>
                </Box>
                ||
              </>
            )}
          {/* Personal menu */}
          {auth.isLoggedIn && (
            <>
              <div className="logged-in-user">
                Logged in as <span>{auth.userEmail}</span>
              </div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open Personal data">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonIcon sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <PersonalNavlinks />
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
