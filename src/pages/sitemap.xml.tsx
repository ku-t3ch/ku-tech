import { NextPage, NextPageContext } from "next";

const URL = "https://tech.nisit.ku.ac.th"

export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  res?.setHeader("Content-Type", "text/xml");

  res?.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${URL}/post-sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${URL}/page-sitemap.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    </urlset>
  `);
  res?.end();

  return {
    props: {},
  };
}

interface Props {}

const Sitemap: NextPage<Props> = () => {
  return <></>;
};

export default Sitemap;
