import { Avatar, Text } from "@nextui-org/react";
import { Tooltip } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const PartnerData = [
  {
    name: "สภาผู้แทนนิสิต มหาวิทยาลัยเกษตรศาสตร์",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/สภาผู้แทนนิสิต.png",
    link: "https://www.facebook.com/kusc.bk",
  },
  {
    name: "องค์การบริหาร องค์การนิสิต มหาวิทยาลัยเกษตรศาสตร์ บางเขน",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/อบก.png",
    link: "https://www.facebook.com/kusab.bk/",
  },
  {
    name: "KU Startup",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/KUStartup.jpg",
    link: "https://www.facebook.com/Kustartup",
  },
  {
    name: "KU Blockchain",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/KUBlockchain.jpg",
    link: "https://www.facebook.com/KUBCS/",
  },
  {
    name: "GDSC KU",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/GDSCKU.png",
    link: "https://www.facebook.com/gdsc.ku/",
  },
  {
    name: "KU Case Club",
    image: "https://s3.tech.nisit.ku.ac.th/assets/partner/caseclub.jpg",
    link: "https://www.facebook.com/profile.php?id=61556204251832",
  }
];

const Partner: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Text b size={"$4xl"} className="">
          พันธมิตร (Partner)
        </Text>
        <div className="flex flex-wrap justify-center gap-5 text-white">
          {PartnerData.map((partner, index) => (
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

export default Partner;
