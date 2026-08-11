import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/Navigation.scss';

const sections = ['home', 'about', 'expertise', 'projects', 'history', 'education', 'contact'];

function Navigation({parentToChild, modeChange}: any) {

  const {mode} = parentToChild;
  const { t, lang, toggleLang, isRtl } = useLanguage();
  const navItems = t.nav.items.map((label, i) => [label, sections[i]]);

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
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
          <ListItem key={item[0]} disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                scrollToSection(item[1]);
              }}
            >
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
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
              <Button key={item[0]} onClick={() => scrollToSection(item[1])}>
                {item[0]}
              </Button>
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
