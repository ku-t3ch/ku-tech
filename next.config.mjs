// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.activities/techcamp/01/1.jpg
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  env: {
    externalApi: "https://tech.nisit.ku.ac.th/kutechapi",
    turnstileSiteKey: "0x4AAAAAAASkT2UfXd_B2UIK",
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "s3.tech.nisit.ku.ac.th",
      },{
        protocol: "https",
        hostname: "ap-northeast-1.graphassets.com",
      }
    ],
  },
};
export default config;
