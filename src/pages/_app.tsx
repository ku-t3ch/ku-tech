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
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import SEO from "../next-seo.config";
import { DefaultSeo } from "next-seo";
import CookieConsentFooter from "@/components/CookieConsentFooter";

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
                <Toaster position="top-right" reverseOrder={false} />
                <Component {...pageProps} />
              </ConfigProvider>
            </NextUIProvider>
          </ReCaptchaProvider>
        </SessionProvider>
      </ApolloProvider>
      <CookieConsentFooter />
    </>
  );
};

export default api.withTRPC(MyApp);
