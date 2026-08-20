import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Navigation.scss';

function Navigation({parentToChild, modeChange}: any) {

  const {mode} = parentToChild;
  const { t, lang, toggleLang, isRtl } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /* Labels and section ids travel together now — see NavItem in translations */
  const navItems = t.nav.items;

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  /* Desktop dropdown: which parent item is open, and the button it hangs from */
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /* Mobile drawer: which parent group is expanded */
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const closeDesktopMenu = () => {
    setMenuAnchor(null);
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const scrolled = window.scrollY > navbar.clientHeight;
        setScrolled(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* Section links belong to the one-page portfolio. From another route
     (e.g. /blog) they first go home, handing the target section over in the
     router state — AppShell picks it up and finishes the scroll. */
  const scrollToSection = (section: string) => {
    if (pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
      return;
    }

    if (section === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Route items (path) open their page; section items scroll */
  const openNavItem = (item: { section?: string; path?: string }) => {
    if (item.path) {
      navigate(item.path);
      return;
    }
    if (item.section) {
      scrollToSection(item.section);
    }
  };

  const drawer = (
    <Box className="navigation-bar-responsive nav-drawer-inner">
      <div className="nav-drawer-head">
        <span className="nav-drawer-title">{t.nav.menu}</span>
        <IconButton
          className="nav-drawer-close"
          onClick={handleDrawerToggle}
          aria-label={t.nav.menu}
        >
          <CloseIcon/>
        </IconButton>
      </div>
      <List className="nav-drawer-list">
        {navItems.map((item) => (
          item.children ? (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setExpandedGroup((prev) => prev === item.label ? null : item.label)}
                  aria-expanded={expandedGroup === item.label}
                >
                  <ListItemText primary={item.label} />
                  {expandedGroup === item.label ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </ListItemButton>
              </ListItem>
              <Collapse in={expandedGroup === item.label} timeout="auto" unmountOnExit>
                <List className="nav-drawer-sublist" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.label} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleDrawerToggle();
                          scrollToSection(child.section);
                        }}
                      >
                        <ListItemText primary={child.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  openNavItem(item);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" id="navigation" className={`navbar-fixed-top${scrolled ? ' scrolled' : ''}`}>
        <Toolbar className='navigation-bar'>
          <span className="nav-logo" onClick={() => scrollToSection('home')}>
            Haroon<span className="nav-logo-dot">.</span>
          </span>

          <Box className="nav-links" sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item) => (
              item.children ? (
                <React.Fragment key={item.label}>
                  <Button
                    onClick={(event) => {
                      setMenuAnchor(event.currentTarget);
                      setOpenMenu(item.label);
                    }}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <KeyboardArrowDownIcon className={`nav-caret${openMenu === item.label ? ' open' : ''}`} />
                  </Button>
                  <Menu
                    anchorEl={menuAnchor}
                    open={openMenu === item.label}
                    onClose={closeDesktopMenu}
                    disableScrollLock
                    /* Centered under the button, so it reads the same in RTL */
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    /* Portalled on <body> like the drawer — hand it the theme
                       class so the palette variables stay in scope */
                    PaperProps={{
                      className: `nav-dropdown ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`
                    }}
                  >
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.label}
                        onClick={() => {
                          closeDesktopMenu();
                          scrollToSection(child.section);
                        }}
                      >
                        {child.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ) : (
                <Button key={item.label} onClick={() => openNavItem(item)}>
                  {item.label}
                </Button>
              )
            ))}
          </Box>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-lang"
              onClick={toggleLang}
              aria-label={`Switch language to ${t.nav.langSwitchTo}`}
            >
              <span className={`nav-lang-en${lang === 'en' ? ' active' : ''}`}>EN</span>
              <span className="nav-lang-sep">/</span>
              <span className={`nav-lang-ar${lang === 'ar' ? ' active' : ''}`}>ع</span>
            </button>
            {mode === 'dark' ? (
              <LightModeIcon onClick={() => modeChange()}/>
            ) : (
              <DarkModeIcon onClick={() => modeChange()}/>
            )}

            {/* Last in the row, so the button sits on the same edge the drawer
                slides in from — thumb stays where the panel appears. */}
            <IconButton
              className="nav-menu-btn"
              color="inherit"
              aria-label="open menu"
              aria-expanded={mobileOpen}
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          /* Opens from the side the menu button lives on, which flips with the
             writing direction. */
          anchor={isRtl ? 'left' : 'right'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          /* The drawer renders in a portal on <body>, outside .main-container,
             so it never inherits the theme class — which is why it stayed white
             in dark mode. Handing the class to the paper puts the palette
             variables back in scope. */
          PaperProps={{
            className: `nav-drawer ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`
          }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;
