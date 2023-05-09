import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ConfigProvider, theme } from "antd";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Toaster } from "react-hot-toast";
import { ReCaptchaProvider } from "next-recaptcha-v3";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
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
      <GoogleAnalytics trackPageViews />
      <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
        <NextUIProvider theme={darkTheme}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#28C2F4",
              },
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Toaster position="top-right" reverseOrder={false} />
            <Component {...pageProps} />
          </ConfigProvider>
        </NextUIProvider>
      </ReCaptchaProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
