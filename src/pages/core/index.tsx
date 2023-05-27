import { api } from "@/utils/api";
import { Button, Card, Form, Input, List, Typography } from "antd";
import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { ShortLink } from "@prisma/client";
import { toast } from "react-hot-toast";
import _ from "lodash";
import { getToken } from "next-auth/jwt";
import UploadComponent from "@/components/UploadComponent";
import Link from "next/link";

export async function getServerSideProps(ctx: NextPageContext) {
  const token = await getToken({
    req: ctx.req as any,
    secret: process.env.JWT_SECRET,
  });
  if (!token?.isCoreTeam) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Core: NextPage<Props> = () => {
  const createShortLinkApi = api.core.createShortLink.useMutation();
  const getAllShortLinkApi = api.core.getAllShortLink.useQuery();
  const [formShortLink] = Form.useForm();

  const createShortLink = async () => {
    const { url } = await formShortLink.validateFields();
    await createShortLinkApi.mutateAsync({ original_link: url });
    getAllShortLinkApi.refetch();
    formShortLink.resetFields();
  };

  const clipboard = (item: ShortLink) => {
    navigator.clipboard.writeText(`http://kutech.club/g/${item.short_link}`);
    toast.success(`Copied http://kutech.club/g/${item.short_link}`);
  };

  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Card title={<>เปลี่ยนรูปโปรไฟล์ <Link href={"/members"}>หน้าคณะทำงาน</Link></>} bordered={false}>
            <UploadComponent
              onReady={(v) => toast.success("อัพโหลดรูปภาพสำเร็จ")}
              action="/api/image_upload_core_team_cms"
            />
          </Card>
          <Card title="ระบบย่อ link" bordered={false}>
            <Form
              onFinish={createShortLink}
              layout="vertical"
              form={formShortLink}
            >
              <Form.Item name="url" label="URL" rules={[{ required: true }]}>
                <Input placeholder="Shorten your link" />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={createShortLinkApi.isLoading}
                >
                  Shorten
                </Button>
              </Form.Item>
            </Form>
            <List
              header={<div>History</div>}
              bordered
              dataSource={_.orderBy(
                getAllShortLinkApi.data,
                (o) => o.createdAt,
                "desc"
              )}
              renderItem={(item) => (
                <List.Item className="overflow-x-auto">
                  <ContentCopyIcon
                    className="cursor-pointer text-blue-400"
                    onClick={() => clipboard(item)}
                    sx={{ width: 17 }}
                  />{" "}
                  {item.original_link}
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </WithNavbar>
  );
};

export default Core;
