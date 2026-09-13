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
  transpilePackages: [
    "antd", "@ant-design", "@ant-design/icons", "@ant-design/icons-svg",
    "rc-util", "rc-field-form", "rc-pagination", "rc-picker", "rc-notification",
    "rc-tooltip", "rc-tree", "rc-table", "rc-input", "rc-input-number",
    "rc-select", "rc-menu", "rc-motion", "rc-dropdown", "rc-overflow",
    "rc-resize-observer", "rc-trigger", "rc-align", "rc-checkbox",
    "rc-collapse", "rc-dialog", "rc-drawer", "rc-image", "rc-mentions",
    "rc-progress", "rc-rate", "rc-segmented", "rc-slider", "rc-steps",
    "rc-switch", "rc-tabs", "rc-textarea", "rc-upload", "rc-virtual-list",
  ],
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
