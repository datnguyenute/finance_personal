"use client";
import { createTheme, ThemeProvider, PaletteMode, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleColorMode from "./ToggleColorMode";
import {
  alpha,
  Button,
  CssBaseline,
  Drawer,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import Profile from "@/components/profile/profile";
import ProfileAvatar from "@/components/profile/avatar";
import { AccountCircle, ExitToApp } from "@mui/icons-material";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  bgcolor: "transparent",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

const pages = [
  {
    url: "/transactions",
    name: "Transactions",
  },
  {
    url: "/report",
    name: "Report",
  },
];

interface TemplateFrameWrapperProps {
  children: ReactNode;
}

export default function TemplateFrameWrapper(props: TemplateFrameWrapperProps) {
  const router = useRouter();
  const { children } = props;
  const { data: session } = useSession();
  const [mode, setMode] = useState<PaletteMode>("light");
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [openProfile, setOpenProfile] = useState(false);

  // Get color mode from Localstorage
  useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  // Toggle color mode
  const toggleColorMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    // Save the selected mode to localStorage
    localStorage.setItem("themeMode", newMode);
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

  const redirectTo = (route: string) => {
    router.push(route);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <StyledToolbar variant="dense" disableGutters>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Stack
                marginRight={2}
                alignItems="center"
                direction="row"
                gap={1}
                onClick={() => redirectTo("/")}
                sx={(theme) => ({
                  display: { xs: "none", md: "flex" },
                  cursor: "pointer",
                  color: "primary.main",
                  ...theme.applyStyles("dark", {
                    color: "primary.light",
                  }),
                })}
              >
                <AssuredWorkloadIcon />
                <Typography component="span" variant="h5">
                  Personal Finances
                </Typography>
              </Stack>
              <Box sx={{ display: { xs: "none", md: session && !session.error ? "flex" : "none" }, gap: 1 }}>
                {pages.map((page, index) => (
                  <Button key={index} onClick={() => redirectTo(page.url)} variant="text" color="info" size="small">
                    {page.name}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box
              sx={(theme) => ({
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                cursor: "pointer",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              <IconButton
                size="large"
                aria-label="display actions bar"
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
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {session && !session.error ? (
                  pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Link href={page.url} style={{ color: "unset", textDecoration: "unset" }}>
                        {page.name}
                      </Link>
                    </MenuItem>
                  ))
                ) : (
                  <Box>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href="/auth/register" style={{ color: "unset", textDecoration: "unset" }}>
                        Sign up
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link href="/auth/login" style={{ color: "unset", textDecoration: "unset" }}>
                        Sign in
                      </Link>
                    </MenuItem>
                  </Box>
                )}
              </Menu>
            </Box>
            <Stack
              marginRight={2}
              alignItems="center"
              direction="row"
              gap={1}
              onClick={() => redirectTo("/")}
              sx={(theme) => ({
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                cursor: "pointer",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              <AssuredWorkloadIcon />
              <Typography component="span" variant="h5">
                Personal Finances
              </Typography>
            </Stack>

            <Stack sx={{ display: "flex" }} direction="row" alignItems={"center"} gap={2}>
              <Box>
                <ToggleColorMode data-screenshot="toggle-mode" mode={mode} toggleColorMode={toggleColorMode} />
              </Box>
              {session && !session.error ? (
                <Box>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <ProfileAvatar />
                  </IconButton>
                  <Menu
                    sx={{ mt: "40px", width: "200px" }}
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
                    <MenuItem
                      onClick={() => {
                        setOpenProfile(!openProfile);
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={async () => {
                        await signOut();
                        redirectTo("/auth/login");
                        handleCloseUserMenu();
                      }}
                    >
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Stack sx={{ display: { xs: "none", md: "block" } }} direction="row" spacing={2}>
                  <Link href="/auth/register">
                    <Button variant="contained" color="primary">
                      Sign up
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outlined">Sign in</Button>
                  </Link>
                </Stack>
              )}
            </Stack>
          </StyledToolbar>
        </StyledAppBar>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
      <Drawer anchor={"right"} open={openProfile} onClose={() => setOpenProfile(false)}>
        <Profile />
      </Drawer>
    </ThemeProvider>
  );
}
