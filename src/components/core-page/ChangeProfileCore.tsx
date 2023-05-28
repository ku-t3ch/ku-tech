import { Button, Card, Form } from "antd";
import { NextPage } from "next";
import Link from "next/link";
import UploadComponent from "../UploadComponent";
import { toast } from "react-hot-toast";
import { api } from "@/utils/api";

interface Props {}

const ChangeProfileCore: NextPage<Props> = () => {
  const deleteProfileImageApi = api.core.deleteProfileImage.useMutation();
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
        <Form layout="vertical">
          <Form.Item label="เปลี่ยนรูปโปรไฟล์">
            <UploadComponent
              onReady={(v) => toast.success("อัพโหลดรูปภาพสำเร็จ")}
              action="/api/image_upload_core_team_cms"
            />
          </Form.Item>
          <Form.Item label={<div>ลบรูปออกจากหน้าสมาชิก <span className="text-red-500 font-bold">(สำหรับคนที่ต้องการความเป็นส่วนตัว)</span></div>}>
            <Button
              onClick={() =>
                deleteProfileImageApi.mutate(undefined, {
                  onSuccess: () => toast.success("ลบรูปออกสำเร็จ"),
                })
              }
              loading={deleteProfileImageApi.isLoading}
              danger
            >
              ลบรูปออก
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default ChangeProfileCore;
