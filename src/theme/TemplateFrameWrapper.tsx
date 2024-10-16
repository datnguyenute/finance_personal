"use client"
import * as React from 'react';
import {
  createTheme,
  ThemeProvider,
  PaletteMode,
  styled,
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ToggleColorMode from './ToggleColorMode';
import { Avatar, CssBaseline, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

const pages = [
  {
    url: "/report",
    name: "Report"
  },
  {
    url: "/transactions",
    name: "Transactions"
  },
];
const settings = ['Profile', 'Logout'];

interface TemplateFrameWrapperProps {
  children: React.ReactNode;
}

export default function TemplateFrameWrapper(props: TemplateFrameWrapperProps) {
  const router = useRouter();
  const { children } = props;
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Get color mode from Localstorage
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle color mode
  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    // Save the selected mode to localStorage
    localStorage.setItem('themeMode', newMode);
  };
  const defaultTheme = createTheme({ palette: { mode } });
  // const signInSideTheme = createTheme(getMainTheme(mode));

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const redirectToHomepage = () => {
    router.push('/');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              p: '8px 12px',
            }}
          >
            <Stack alignItems="center" direction="row" gap={2} sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.primary', cursor: "pointer" }} onClick={() => redirectToHomepage()}>
              <AssuredWorkloadIcon sx={{ color: 'text.primary' }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'text.primary',
                }}
              >FINANCE PERSONAL
              </Typography>
            </Stack>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, "> a": { color: "text.secondary", display: "block", margin: "0 16px", textDecoration: "unset" } }}>
              {pages.map((page) => (
                <Link key={page.name} href={page.url}>{page.name}</Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.url} style={{ color: "unset", textDecoration: "unset" }}>{page.name}</Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Stack alignItems="center" direction="row" gap={2} sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, color: 'text.primary', cursor: "pointer" }} onClick={() => redirectToHomepage()}>
              <AssuredWorkloadIcon sx={{ color: 'text.primary' }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'text.primary',
                }}
              >FINANCE PERSONAL
              </Typography>
            </Stack>

            <Stack sx={{ display: 'flex' }} direction="row" alignItems={"center"} gap={2}>
              <Box>
                <ToggleColorMode
                  data-screenshot="toggle-mode"
                  mode={mode}
                  toggleColorMode={toggleColorMode}
                />
              </Box>
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="DatNB4" src="/static/images/avatar/2.jpg" />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Link style={{ color: "unset", textDecoration: "unset" }} href={"/profile"}>{setting}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Stack>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: '1 1', overflow: 'auto' }}>{children}</Box>
      </Box>
    </ThemeProvider>
  );
}
