import { Icon } from "@iconify/react";
import clsx from "clsx";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  content: string;
  href?: string;
}

const ActivityCard: NextPage<Props> = ({ icon, title, content, href }) => {
  const RootClass = clsx(
    "flex w-full flex-col items-start rounded-xl border-[1px] border-[#1e3948] bg-[#151e27] p-5 text-[#FFFFFF] duration-300 ease-out hover:bg-[#192531]",
    href ? "cursor-pointer" : "cursor-default"
  );

  return href ? (
    <Link href={href} target="_blank" className={clsx(RootClass, "relative")}>
      <div className="absolute top-3 right-3">
        <Icon icon="material-symbols:open-in-new" className="text-xl" />
      </div>
      {icon}
      <div className="text-xl font-light">{title}</div>
      <div className="font-light">{content}</div>
    </Link>
  ) : (
    <div className={RootClass}>
      {icon}
      <div className="text-xl font-light">{title}</div>
      <div className="font-light">{content}</div>
    </div>
  );
};

export default ActivityCard;
