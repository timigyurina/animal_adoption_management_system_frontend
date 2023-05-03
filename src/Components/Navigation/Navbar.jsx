import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../../context/ColorModeContext";
import MenuBase from "./MenuBase";
import Navlinks from "./Navlinks";
import PersonalNavlinks from "./PersonalNavlinks";
import EmployeeNavlinks from "./EmployeeNavlinks";
import AdminNavlinks from "./AdminNavlinks";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
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
          {/* Desktop view */}
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
          {/* Mobile view */}
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
              <MenuBase
                iconChild={<PersonIcon  />}
                tooltipTitle="Personal menu"
              >
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
