import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../../context/ColorModeContext";
import MenuBase from "./MenuBase";
import Navlinks from "./Navlinks";
import PersonalNavlinks from "./PersonalNavlinks";
import EmployeeNavlinks from "./EmployeeNavlinks";
import AdminNavlinks from "./AdminNavlinks";

import {AppBar, Box, Toolbar, IconButton, Menu, Container} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HelpIcon from "@mui/icons-material/Help";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Icon for desktop view */}
          <Box component={Link} to="/">
            <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Box>
          {/* Menu with links and logo for mobile view */}
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
            <Box
              component={Link}
              to="/"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            </Box>
          </Box>
          {/* Links for desktop view */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Navlinks />
          </Box>
          {/* Admin menu (all entities) */}
          {auth.isLoggedIn &&
            auth.userRoles.some((r) => ["Administrator"].indexOf(r) >= 0) && (
              <MenuBase
                iconChild={<ExpandMoreIcon color="inherit" />}
                tooltipTitle="Admin menu"
              >
                <AdminNavlinks />
              </MenuBase>
            )}
          {/* Employe emenu (own Shelter-related entities) */}
          {auth.isLoggedIn &&
            auth.userRoles.some((r) => ["ShelterEmployee"].indexOf(r) >= 0) && (
              <MenuBase
                iconChild={<BadgeIcon />}
                tooltipTitle="Shelter-related menu"
              >
                <EmployeeNavlinks />
              </MenuBase>
            )}
          {/* Personal menu */}
          {auth.isLoggedIn && (
            <>
              <div className="logged-in-user">
                Logged in as <span>{auth.userEmail}</span>
              </div>
              <MenuBase iconChild={<PersonIcon />} tooltipTitle="Personal menu">
                <PersonalNavlinks />
              </MenuBase>
            </>
          )}

          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>

          <li>
            <NavLink to="/contact">
              <HelpIcon color="inherit" />
            </NavLink>
          </li>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
