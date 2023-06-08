import { NextPage } from "next";
import { Html, Head, NextScript, Main } from "next/document";

interface Props {}

const _document: NextPage<Props> = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script async src="https://umami-teerut.vercel.app/script.js" data-website-id="1d278cc7-aa50-4fba-932b-853a26ec0197"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
