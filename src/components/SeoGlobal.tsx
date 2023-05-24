import { NextPage } from "next";
import Head from "next/head";

interface Props {}

const SeoGlobal: NextPage<Props> = () => {
  return (
    <Head>
      <title>KU Tech</title>
      
      <meta name="title" content="KU Tech" />
      <meta
        name="description"
        content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://kutech.club/" />
      <meta property="og:title" content="KU Tech" />
      <meta
        property="og:description"
        content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
      />
      <meta property="og:image" content="/og-image.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="http://kutech.club/" />
      <meta property="twitter:title" content="KU Tech" />
      <meta
        property="twitter:description"
        content="KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้ และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย"
      />
      <meta property="twitter:image" content="/og-image.png" />
    </Head>
  );
};

export default SeoGlobal;
