import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import { Tooltip } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="/">
        Finanace personal
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <div>
          <Link color="text.secondary" variant="body2" href="#">
            Privacy Policy
          </Link>
          <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}>&nbsp;•&nbsp;</Typography>
          <Link color="text.secondary" variant="body2" href="#">
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: "left", color: "text.secondary" }}>
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/datnguyenute/finance_personal"
            aria-label="NextJS Frontend"
            sx={{ alignSelf: "center" }}
          >
            <Tooltip title="NextJS Frontend">
              <GithubIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/datnguyenute/backend_mockup"
            aria-label="NestJS Backend"
            sx={{ alignSelf: "center" }}
          >
            <Tooltip title="NestJS Backend">
              <GithubIcon />
            </Tooltip>
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
