import { Avatar, Text } from "@nextui-org/react";
import { Tooltip } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const CompanyData = [
  {
    name: "SCB Academy",
    image: "https://s3.tech.nisit.ku.ac.th/assets/company/SCBAcademy.png",
    link: "https://www.facebook.com/scbacademy.thailand",
  }
];

const Company: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <Text b size={"$4xl"} className="">
          ความร่วมมือ (Company)
        </Text>
        <div className="flex flex-wrap justify-center gap-5 text-white">
          {CompanyData.map((Company, index) => (
            <Tooltip title={Company.name} key={index}>
              <a className="flex flex-col" href={Company.link} target="_bank">
                <Avatar
                  css={{ width: isMobile ? "5rem" : "6rem", height: isMobile ? "5rem" : "6rem" }}
                  src={Company.image}
                  color="gradient"
                  alt={Company.name}
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

export default Company;
