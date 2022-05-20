import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CareerIcon from "@mui/icons-material/Insights";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp, GroupAdd } from "@mui/icons-material";
import { userActions } from "../../store/user-slice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const ListButton = (props) => (
  <ListItem disabled={props.disabled} onClick={props.onClick} button>
    <ListItemIcon sx={{ minWidth: "46px" }}>{props.icon}</ListItemIcon>
    <ListItemText primary={props.primary} />
  </ListItem>
);

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openLoginPage = () => {
    handleMenuClose();
    if (props.pathname !== "/login") props.onEnterOut();
    if (props.pathname === "/predict-career") navigate("/login");
    else
      setTimeout(() => {
        navigate("/login");
      }, 400);
  };
  const predictCareerHandler = () => {
    if (user.isLoggedIn)
      if (user.userPath.prediction.length || user.userPath.path.length)
        navigate("/predict-career/pathway");
      else navigate("/predict-career");
    else openLoginPage();
  };
  const menuId = "primary-search-account-menu";
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar
          sx={{
            backgroundColor: "transparent",
            boxShadow: "0",
          }}
          className={classes.navBar}
          position="static"
        >
          <Toolbar>
            <div className={classes.logo}>
              {window.innerWidth > 1000 ? (
                <Link to="/">Career Dendrogram DR710</Link>
              ) : (
                <IconButton
                  size="large"
                  edge="start"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MenuIcon color="white" />
                </IconButton>
              )}
            </div>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                sx={{ width: { sm: "30rem", xl: "40rem" } }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ display: window.innerWidth > 1000 ? "flex" : "none" }}>
              <div className={classes.logo} onClick={predictCareerHandler}>
                Predict your career
              </div>
            </Box>
            {user.isLoggedIn ? (
              <React.Fragment>
                <Box
                  sx={{ display: window.innerWidth > 1000 ? "flex" : "none" }}
                >
                  {user.userAuthInfo.name ? (
                    <div style={{ cursor: "text" }} className={classes.logo}>
                      {`Hello, ${user.userAuthInfo.name}`}
                    </div>
                  ) : null}
                </Box>
                <Box sx={{ display: "flex" }}>
                  <div
                    onClick={() => {
                      dispatch(userActions.logout());
                      openLoginPage();
                    }}
                    className={classes.logo}
                  >
                    Logout
                  </div>
                </Box>
              </React.Fragment>
            ) : (
              <Box sx={{ display: "flex" }}>
                <div onClick={openLoginPage} className={classes.logo}>
                  Login
                </div>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        {/* {renderMenu} */}
        <Drawer anchor={"left"} open={isMenuOpen} onClose={handleMenuClose}>
          <Box
            sx={{
              width: 250,
              marginTop: { xs: "0.5rem", sm: "1rem" },
            }}
            role="presentation"
          >
            {user.isLoggedIn && user.userAuthInfo.name ? (
              <Box
                sx={{
                  padding: "8px 16px",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
                role="presentation"
              >
                {`Hello, ${user.userAuthInfo.name}`}
              </Box>
            ) : null}
            <List>
              <ListButton
                onClick={() => {
                  navigate("/");
                }}
                disabled={location.pathname === "/"}
                icon={<HomeIcon />}
                primary="Home"
              />
              <ListButton
                onClick={() => {
                  navigate(
                    user.userPath.prediction.length || user.userPath.path.length
                      ? "/predict-career/pathway"
                      : "/predict-career"
                  );
                }}
                disabled={location.pathname === "/predict-career"}
                icon={<CareerIcon />}
                primary="Predict your career"
                button
              />
            </List>
            <Divider />
            <List>
              {!user.isLoggedIn ? (
                <React.Fragment>
                  <ListButton
                    onClick={() => {
                      navigate("/login");
                    }}
                    icon={<AccountCircle />}
                    primary="Login"
                    disabled={location.pathname === "/login"}
                    button
                  />

                  <ListButton
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    disabled={location.pathname === "/sign-up"}
                    icon={<GroupAdd />}
                    primary="Sign up"
                    button
                  />
                </React.Fragment>
              ) : (
                <ListButton
                  onClick={() => {
                    dispatch(userActions.logout());
                    navigate("/login");
                  }}
                  icon={<ExitToApp />}
                  primary="logout"
                  button
                />
              )}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box></Box>
    </React.Fragment>
  );
}
