import clsx from "clsx";

import { FC } from "react";
import { Tag } from "@/interfaces/TagsInterface";

import { Icon } from "@iconify/react";
import { Text } from "@nextui-org/react";

interface Props {
  style?: "default" | "outline";
  tag: Tag;
  isActive?: boolean;
  onClick: () => void;
}

const CardTag: FC<Props> = ({ style, tag, isActive = false, onClick }) => {
  let styled = "";

  switch (style) {
    case "outline":
      styled =
        "flex-1 hover:text-white hover:border-[#0077b6] hover:bg-[#0077b6]";

      if (isActive) {
        styled += " border border-[#0077b6] bg-[#0077b6] text-white";
      } else {
        styled += " border border-[#938f99] text-[#99dff9]";
      }
      break;
    default:
      if (isActive) {
        styled += " bg-[#0077b6]";
      } else {
        styled = "bg-[#212b31]";
      }
  }
  return (
    <div
      className={clsx(
        "block cursor-pointer rounded-[.6rem] px-[.5rem] py-[.4rem]",
        styled
      )}
      onClick={onClick}
    >
      <div className="flex h-full items-center justify-center gap-1 font-medium">
        {isActive && (
          <Text>
            <Icon icon="fe:check" className="text-[1.2rem] font-bold" />
          </Text>
        )}

        <span className={clsx("whitespace-nowrap text-sm")}>{tag.name}</span>
      </div>
    </div>
  );
};

const CardTagSkeleton = () => {
  return (
    <div className="h-[2rem] animate-pulse rounded-[.7rem] bg-[#212b31] px-[3.1rem]" />
  );
};

export { CardTagSkeleton };
export default CardTag;
