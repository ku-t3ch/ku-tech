import { Card } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import UploadComponent from "../UploadComponent";
import { toast } from "react-hot-toast";

interface Props {}

const ChangeProfileCore: NextPage<Props> = () => {
  return (
    <>
      <Card
        title={
          <>
            เปลี่ยนรูปโปรไฟล์ <Link href={"/members"}>หน้าคณะทำงาน</Link>
          </>
        }
        bordered={false}
      >
        <UploadComponent
          onReady={(v) => toast.success("อัพโหลดรูปภาพสำเร็จ")}
          action="/api/image_upload_core_team_cms"
        />
      </Card>
    </>
  );
};

export default ChangeProfileCore;
