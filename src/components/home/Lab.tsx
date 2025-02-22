import { Avatar, Text } from "@nextui-org/react";
import { Tooltip } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const LabData = [
  {
    name: "Cloud Intelligence and Security Optimization (CISO)",
    image: "https://s3.tech.nisit.ku.ac.th/assets/lab/ciso.png",
    link: "https://ciso.tech.nisit.ku.ac.th",
  }
];

const Lab: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Text b size={"$4xl"} className="">
          ห้องวิจัยและปฏิบัติการ (Laboratory)
        </Text>
        <div className="flex flex-wrap justify-center gap-5 text-white">
          {LabData.map((partner, index) => (
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

export default Lab;