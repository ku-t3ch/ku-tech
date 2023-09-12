import { DefaultSeoProps } from "next-seo";

export default {
  title: "กลุ่มกิจกรรมเทคโนโลยี มหาวิทยาลัยเกษตรศาสตร์ -  KU Tech",
  description:
    "KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม",
  openGraph: {
    title: "KU Tech",
    url: "http://tech.nisit.ku.ac.th/",
    type: "website",
    description:
      "KU Tech คือ การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม",
    images: [
      {
        url: "/og-image.png",
        width: 1600,
        height: 900,
        alt: "KU Tech",
      },
    ],
    siteName: "KU Tech",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
} as DefaultSeoProps;
