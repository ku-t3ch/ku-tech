import { NextPage } from "next";
import {
  Html,
  Head,
  NextScript,
  Main,
} from "next/document";

interface Props {}

const _document: NextPage<Props> = () => {
  return (
    <Html>
      <Head>
        {/* {CssBaseline.} */}
        <title>KU Tech</title>
        <meta name="title" content="KU Tech" />
        <meta
          name="description"
          content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tech.csku.in.th/" />
        <meta property="og:title" content="KU Tech" />
        <meta
          property="og:description"
          content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tech.csku.in.th/" />
        <meta property="twitter:title" content="KU Tech" />
        <meta
          property="twitter:description"
          content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
        />
        <meta property="twitter:image" content="/og-image.png" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

// _document.getInitialProps = async (ctx) => {
//   const initialProps = await Document.getInitialProps(ctx as DocumentContext);
//   return {
//     ...initialProps,
//     styles: React.Children.toArray([initialProps.styles]),
//   };
// };

export default _document;
