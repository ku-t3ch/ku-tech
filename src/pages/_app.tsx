import "@/styles/globals.css";

import SEO from "../next-seo.config";
import CookieConsentFooter from "@/components/CookieConsentFooter";

import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { ConfigProvider, theme } from "antd";
import { NextUIProvider, createTheme } from "@nextui-org/react";

import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { api } from "@/utils/api";
import { RecoilRoot } from "recoil";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { clarity } from 'react-microsoft-clarity';

import { Toaster } from "react-hot-toast";
import { NavbarContextProvider } from "@/contexts/NavbarContext";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {},
    space: {},
    fonts: {},
  },
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isStart, setIsStart] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    clarity.init('mgtyo69e3n');
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
    <>
      <DefaultSeo {...SEO} />
      <RecoilRoot>
        <ApolloProvider client={client}>
          <SessionProvider session={session}>
            <GoogleAnalytics trackPageViews />
            <ReCaptchaProvider
              reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            >
              <NextUIProvider theme={darkTheme}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#28C2F4",
                    },
                    algorithm: theme.darkAlgorithm,
                  }}
                >
                  <NavbarContextProvider>
                    <Toaster position="top-right" reverseOrder={false} />
                    <Component {...pageProps} />
                  </NavbarContextProvider>
                </ConfigProvider>
              </NextUIProvider>
            </ReCaptchaProvider>
          </SessionProvider>
        </ApolloProvider>
      </RecoilRoot>
      <CookieConsentFooter />
    </>
  );
};

export default api.withTRPC(MyApp);
