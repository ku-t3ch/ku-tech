import clsx from "clsx";
import Image from "next/image";

import { NextPage } from "next";
import { Info } from "@/interfaces/NewsInterface";

import { Icon } from "@iconify/react";
import { Card, Text } from "@nextui-org/react";

interface Props {
  isRequest?: boolean;
  info: Info;
}

const CardNews: NextPage<Props> = ({ isRequest = false, info }) => {
  return (
    <a href={`/news/${info.id}`}>
      <Card
        isHoverable
        variant="bordered"
        css={{
          borderRadius: "$lg",
          height: "100%",
          background: "transparent",
        }}
        className={clsx("hover:bg-[#2d3d44]", isRequest && "saturate-50")}
      >
        <Card.Body css={{ p: 0 }}>
          <div className="h-[20rem]" style={{ position: "relative" }}>
            <Image
              src={info.cover.url}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Card.Body>
        <Card.Footer css={{ display: "inline-grid" }}>
          <Text b className="truncate">
            <span className="drop-shadow-sm">{info.title}</span>
          </Text>
          <div className="flex items-center gap-1">
            <Text size="$md">
              <Icon icon="ri:time-line" />
            </Text>
            <Text size="$xs">
              <span className="drop-shadow-sm">
                {new Date(info.createdAt).toLocaleString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </Text>
          </div>
        </Card.Footer>
      </Card>
    </a>
  );
};

const CardNewsSkeleton: React.FC<{}> = () => {
  return (
    <Card
      css={{
        borderRadius: "$xs",
        height: "100%",
        border: 0,
      }}
    >
      <Card.Body css={{ p: 0 }}>
        <div className="flex h-[20rem] w-full items-center justify-center bg-[#212b31]">
          <Icon
            icon="ion:image"
            className="h-12 w-12 animate-pulse text-[#364650]"
          />
        </div>
      </Card.Body>
      <Card.Footer css={{ display: "inline-grid", background: "#151b1f" }}>
        <div className="mb-[.4rem] h-[1rem] w-full animate-pulse rounded-[.3rem] bg-[#212b31]" />
        <div className="mb-[.4rem] h-[1rem] w-[50%] animate-pulse rounded-[.3rem] bg-[#212b31]" />
      </Card.Footer>
    </Card>
  );
};

export default CardNews;
export { CardNewsSkeleton };
