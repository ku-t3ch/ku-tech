import { css } from "@emotion/css";
import { Text } from "@nextui-org/react";
import clsx from "clsx";
import { NextPage } from "next";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ActivityCard: NextPage<Props> = ({ icon, title, content }) => {
  return (
    <div
      className={
        "flex w-full cursor-default flex-col rounded-xl border-[1px] border-[#1e3948] bg-[#151e27] hover:bg-[#192531] p-5 text-[#FFFFFF] duration-300 ease-out" +
        css`
          /* :hover {
            background: linear-gradient(270deg, #00aeef 0%, #8dcbe6 100%);
          } */
        `
      }
    >
      {icon}
      <div className="text-xl font-light">{title}</div>
      <div className="font-light">{content}</div>
    </div>
  );
};

export default ActivityCard;
