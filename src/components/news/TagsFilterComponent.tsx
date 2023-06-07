import Button from "./Button";
import CardTag from "./CardTag";

import { FC } from "react";
import { Tag } from "@/interfaces/TagsInterface";

import { Icon } from "@iconify/react";
import { Text } from "@nextui-org/react";

interface Props {
  tags: Tag[];
  tagsId: Array<string>;
  isRequest: boolean;
  onClickSelectTag: (tagId: string) => void;
  onClickUpdate: () => void;
}

const TagsFilterComponent: FC<Props> = ({
  tags,
  tagsId,
  isRequest = false,
  onClickSelectTag,
  onClickUpdate,
}) => {
  return (
    <div className="rounded-[1rem] bg-[#212b31] p-[1.5rem]">
      <div className="pb-[1rem]">
        <Text size="lg" weight="bold">
          เลือกหัวข้อที่สนใจ
        </Text>
      </div>
      <div className="mb-[1rem] flex flex-wrap gap-3">
        {tags?.map((tag, index) => {
          return (
            <CardTag
              style="outline"
              key={index}
              tag={tag}
              isActive={tagsId.includes(tag.id)}
              onClick={() => onClickSelectTag(tag.id)}
            />
          );
        })}
      </div>
      <div className="flex justify-end pt-[1rem]">
        <Button onClick={onClickUpdate} disabled={isRequest}>
          <div className="flex items-center gap-1">
            <Icon icon="mdi:reload" className="text-[1rem]" />
            <div className="text-sm">
              <span className="drop-shadow">อัพเดท</span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

const TagsFilterSkeleton = () => {
  return (
    <div className="rounded-[.7rem] bg-[#151b1f] p-[1.5rem]">
      <div className="pb-[1rem]">
        <div className="h-[1.2rem] w-full animate-pulse rounded-[.3rem] bg-[#212b31]" />
      </div>
      <div className="mb-[1rem] flex flex-wrap gap-3">
        {[...Array(3)].map((_, index) => {
          return (
            <div
              key={index}
              className="h-[2rem] w-[30%] animate-pulse rounded-[.5rem] bg-[#212b31]"
            />
          );
        })}
      </div>
      <div className="flex justify-end pt-[1rem]">
        <Button
          colorStyled="bg-[#212b31]"
          className="animate-pulse px-[3rem]"
        />
      </div>
    </div>
  );
};

export { TagsFilterSkeleton };
export default TagsFilterComponent;
