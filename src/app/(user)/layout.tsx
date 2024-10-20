import * as React from "react";
import TemplateFrameWrapper from "@/theme/TemplateFrameWrapper";
import RootLayout from "../layout";
import NextAuthWrapper from "@/utils/next.auth.wrapper";
import SnackbarProvider from "@/utils/snackbar.wrapper";

export const metadata = {
  title: "Finance personal",
  description: "Generated by Next.js",
};

export default function UserLayout(props: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <SnackbarProvider>
        <NextAuthWrapper>
          <TemplateFrameWrapper>{props.children}</TemplateFrameWrapper>
        </NextAuthWrapper>
      </SnackbarProvider>
    </RootLayout>
  );
}