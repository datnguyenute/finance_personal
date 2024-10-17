import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { LocalizationProvider, AdapterDayjs } from "@/utils/utils";

export const metadata = {
  title: "Finance personal",
  description: "Generated by Next.js",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>{props.children}</AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}