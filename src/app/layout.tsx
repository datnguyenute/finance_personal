import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import AppHeader from "@/components/header/app.header";
import { LocalizationProvider, AdapterDayjs } from "@/utils/utils";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <AppHeader />
              {props.children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}