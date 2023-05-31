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
        "flex w-full flex-col cursor-default rounded-xl border-[1px] border-cyan-300 p-5 text-[#99DFF9] duration-300 hover:text-[#1E1E1E] " +
        css`
          :hover {
            background: linear-gradient(270deg, #00aeef 0%, #8dcbe6 100%);
          }
        `
      }
    >
      {icon}
      <div className="font-light text-xl">
        {title}
      </div>
      <div className="font-light">{content}</div>
    </div>
  );
};

export default ActivityCard;
