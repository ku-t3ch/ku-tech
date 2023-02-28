import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const darkTheme = createTheme({
  type: "dark",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
