import { FC } from "react";
import { Tag } from "@/interfaces/TagsInterface";

interface Props {
  tag: Tag;
}

const NewsTag: FC<Props> = ({ tag }) => {
  return (
    <div className="flex h-[1.8rem] cursor-pointer items-center justify-center rounded-[.5rem] bg-[#2b292e] px-[.8rem] text-sm shadow-lg">
      {tag.name}
    </div>
  );
};

export default NewsTag;
