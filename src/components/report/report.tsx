"use client";

import { Box, Container } from "@mui/material";
import ReportBody from "./report.body";

const Report = () => {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage: "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <Container
        sx={{
          pt: { xs: 2, sm: 2 },
          pb: { xs: 2, sm: 4 },
        }}
      >
        <ReportBody />
      </Container>
    </Box>
  );
};

export default Report;