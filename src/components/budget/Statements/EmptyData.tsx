import { type FC } from "react";
import { Icon } from "@iconify/react";
import { Badge } from "@nextui-org/react";

interface Props {}

const EmptyData: FC<Props> = () => {
  return (
    <div className="flex h-[5em] items-center justify-center">
      <Badge size="lg" variant="flat" color="default" isSquared>
        <div className="flex gap-1">
          <Icon icon="tabler:database-x" />
          <span>ขออภัยไม่พบข้อมูลโครงการประจำปีนี้</span>
        </div>
      </Badge>
    </div>
  );
};

export default EmptyData;
