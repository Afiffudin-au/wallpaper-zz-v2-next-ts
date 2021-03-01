import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import { blue } from "@material-ui/core/colors";
import { Tooltip, withStyles } from "@material-ui/core";
import Search from "./Search";
import useStyleNavbar from "../../customHooks/useStyles/useStyleNavbar";
import Link from "next/link";
function Navbar() {
  const classes = useStyleNavbar();
  const [typeSearch, setTypeSearch] = useState("Wallpaper"); //default Wallpaper
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [colorVideoActive, setColorVideoActive] = useState(false);
  const [colorWallActive, setColorWallActive] = useState(false);
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 13,
    },
    arrow: {
      color: "white",
    },
  }))(Tooltip);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleVideosearch = () => {
    setColorWallActive(false);
    setColorVideoActive(!colorVideoActive);
    setTypeSearch("Videos");
  };
  const handleWallpaperSearch = () => {
    setColorVideoActive(false);
    setColorWallActive(!colorWallActive);
    setTypeSearch("Wallpaper");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Video</MenuItem>
      <MenuItem onClick={handleMenuClose}>Wallpaper</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleVideosearch}>
        <IconButton aria-label="show Video" color="inherit">
          <Badge color="secondary">
            <VideoLibraryIcon
              style={
                colorVideoActive ? { color: blue[500] } : { color: "black" }
              }
            />
          </Badge>
        </IconButton>
        <p>Videos</p>
      </MenuItem>
      <MenuItem onClick={handleWallpaperSearch}>
        <IconButton aria-label="show Wallpaper" color="inherit">
          <Badge color="secondary">
            <WallpaperIcon
              style={
                colorWallActive ? { color: blue[500] } : { color: "black" }
              }
            />
          </Badge>
        </IconButton>
        <p>Wallpaper</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} id="navbar__top">
      <AppBar position="static" className={classes.bg}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <a style={{ textDecoration: "none", color: "white" }}>
                Wallpaper-zz
              </a>
            </Link>
          </Typography>
          <div className={classes.search}>
            <Search typeSearch={typeSearch} />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LightTooltip title="Video" arrow>
              <IconButton
                onClick={handleVideosearch}
                aria-label="show Video"
                color="inherit"
              >
                <Badge color="secondary">
                  <VideoLibraryIcon
                    style={
                      colorVideoActive
                        ? { color: blue[500] }
                        : { color: "white" }
                    }
                  />
                </Badge>
              </IconButton>
            </LightTooltip>
            <LightTooltip title="Wallpaper" arrow>
              <IconButton
                onClick={handleWallpaperSearch}
                aria-label="show Wallpaper"
                color="inherit"
              >
                <Badge color="secondary">
                  <WallpaperIcon
                    style={
                      colorWallActive
                        ? { color: blue[500] }
                        : { color: "white" }
                    }
                  />
                </Badge>
              </IconButton>
            </LightTooltip>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
export default Navbar;
