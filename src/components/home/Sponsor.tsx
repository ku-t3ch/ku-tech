import { Avatar, Text } from "@nextui-org/react";
import { Tooltip } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const SponsorData = [
  {
    name: "ทรู คอร์ปอเรชั่น",
    image: "https://s3.tech.nisit.ku.ac.th/assets/sponsor/true.png",
    link: "https://www.true.th",
  },
  {
    name: "แล็กตาซอย",
    image: "https://s3.tech.nisit.ku.ac.th/assets/sponsor/lactasoy.jpg",
    link: "https://www.lactasoy.com",
  },
  {
    name: "ซังซัง",
    image: "https://s3.tech.nisit.ku.ac.th/assets/sponsor/sangsang.jpg",
    link: "https://www.lactasoy.com",
  },
  {
    name: "โก๋แก่",
    image: "https://s3.tech.nisit.ku.ac.th/assets/sponsor/kokhae.png",
    link: "https://www.kokhae.com",
  },
];

const Sponsor: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Text b size={"$4xl"} className="">
          ผู้สนับสนุน (Sponsor)
        </Text>
        <div className="flex flex-wrap justify-center gap-5 text-white">
          {SponsorData.map((partner, index) => (
            <Tooltip title={partner.name} key={index}>
              <a className="flex flex-col" href={partner.link} target="_bank">
                <Avatar
                  css={{ width: isMobile ? "5rem" : "6rem", height: isMobile ? "5rem" : "6rem" }}
                  src={partner.image}
                  color="gradient"
                  alt={partner.name}
                  zoomed
                  bordered
                />
              </a>
            </Tooltip>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sponsor;
