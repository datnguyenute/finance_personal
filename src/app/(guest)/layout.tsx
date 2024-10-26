import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import RootLayout from "../layout";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <>{children}</>
      </AppRouterCacheProvider>
    </RootLayout>
  );
}
