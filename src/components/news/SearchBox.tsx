import { ChangeEventHandler } from "react";

import { Icon } from "@iconify/react";
import { Text } from "@nextui-org/react";

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<Props> = ({ onChange }) => {
  let borderStyle = "border border-[#6b9aac]";

  return (
    <div className={`flex w-full max-w-[34rem]`}>
      <Text
        size="$xl"
        className={`rounded-l-[2rem] border-r-0 ${borderStyle} bg-[#1d2325] p-[.65rem]`}
      >
        <Icon icon="ic:baseline-search" className="text-[#02a6e4]" />
      </Text>
      <input
        type="text"
        onChange={onChange}
        className={`h-full w-full rounded-r-[2rem] border-l-0 ${borderStyle} bg-[#1d2325] text-[.9rem]`}
      />
    </div>
  );
};

export default SearchBox;
