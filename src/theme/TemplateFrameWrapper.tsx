"use client";
import { createTheme, ThemeProvider, PaletteMode, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ToggleColorMode from "./ToggleColorMode";
import {
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
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

const pages = [
  {
    url: "/report",
    name: "Report",
  },
  {
    url: "/transactions",
    name: "Transactions",
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

  console.log(">> data: ", session);

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

  const redirectToHomepage = () => {
    router.push("/");
  };

  const redirectToLoginPage = () => {
    router.push("/auth/login");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "8px 24px",
            }}
          >
            <Stack
              alignItems="center"
              direction="row"
              gap={2}
              sx={{ display: { xs: "none", md: "flex" }, color: "text.primary", cursor: "pointer" }}
              onClick={() => redirectToHomepage()}
            >
              <AssuredWorkloadIcon sx={{ color: "text.primary" }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "text.primary",
                }}
              >
                FINANCE PERSONAL
              </Typography>
            </Stack>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                "> a": { color: "text.secondary", display: "block", margin: "0 16px", textDecoration: "unset" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.url}>
                  {page.name}
                </Link>
              ))}
            </Box>
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
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Link href={page.url} style={{ color: "unset", textDecoration: "unset" }}>
                      {page.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Stack
              alignItems="center"
              direction="row"
              gap={2}
              sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1, color: "text.primary", cursor: "pointer" }}
              onClick={() => redirectToHomepage()}
            >
              <AssuredWorkloadIcon sx={{ color: "text.primary" }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "text.primary",
                }}
              >
                FINANCE PERSONAL
              </Typography>
            </Stack>

            <Stack sx={{ display: "flex" }} direction="row" alignItems={"center"} gap={2}>
              <Box>
                <ToggleColorMode data-screenshot="toggle-mode" mode={mode} toggleColorMode={toggleColorMode} />
              </Box>
              {session && !session.error ? (
                <>
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
                        onClick={() => {
                          signOut();
                          redirectToLoginPage();
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
                </>
              ) : (
                <>
                  <Button variant="outlined" onClick={() => redirectToLoginPage()}>
                    Login
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </StyledAppBar>
        <Box sx={{ flex: "1 1", overflow: "auto" }}>{children}</Box>
      </Box>
      <Drawer anchor={"right"} open={openProfile} onClose={() => setOpenProfile(false)}>
        <Profile />
      </Drawer>
    </ThemeProvider>
  );
}
