import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
        
    },
    space: {},
    fonts: {},
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => setIsStart(true);
    const handleRouteStop = () => setIsStart(false);
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteStop);
    router.events.on("routeChangeError", handleRouteStop);
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteStop);
      router.events.off("routeChangeError", handleRouteStop);
    };
  }, [router]);

  return (
    <SessionProvider session={session}>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
