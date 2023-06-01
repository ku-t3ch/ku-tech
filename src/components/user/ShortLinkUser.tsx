import { api } from "@/utils/api";
import { ShortLink } from "@prisma/client";
import { Form, Card, Input, Button, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import _ from "lodash";
import { NextPage } from "next";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {}

const ShortLinkUser: NextPage<Props> = () => {
  const createShortLinkApi = api.shortlink.createShortLink.useMutation();
  const getAllShortLinkApi = api.shortlink.getAllShortLinkUser.useQuery();
  const DeleteShortLinkApi = api.shortlink.deleteShortLink.useMutation();
  const [formShortLink] = Form.useForm();

  const createShortLink = async () => {
    const { url } = await formShortLink.validateFields();
    await createShortLinkApi.mutateAsync({ original_link: url });
    getAllShortLinkApi.refetch();
    formShortLink.resetFields();
  };

  const clipboard = (item: ShortLink) => {
    navigator.clipboard.writeText(`https://kutech.club/g/${item.short_link}`);
    toast.success(`Copied https://kutech.club/g/${item.short_link}`);
  };

  const URLValidator = async (_: any, value: any) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(value)) {
      return Promise.reject("กรุณากรอก URL ให้ถูกต้อง");
    } else {
      return Promise.resolve();
    }
  };
  return (
    <>
      <Card title="ระบบย่อ link" bordered={false}>
        <Form onFinish={createShortLink} layout="vertical" form={formShortLink}>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, validator: URLValidator }]}
          >
            <Input placeholder="Shorten your link" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={createShortLinkApi.isLoading}>
              Shorten
            </Button>
          </Form.Item>
        </Form>
        <div className="w-full overflow-x-auto">
          <Table
            rowKey={(record) => record.short_link!}
            dataSource={_.orderBy(
              getAllShortLinkApi.data,
              (o) => o.createdAt,
              "desc"
            )}
            columns={
              [
                {
                  title: "Short Link ID",
                  dataIndex: "short_link",
                  key: "short_link",
                },
                {
                  title: "Original Link",
                  dataIndex: "original_link",
                  key: "original_link",
                },
                {
                  title: "View Count",
                  dataIndex: "count",
                  key: "count",
                },
                {
                  title: "Action",
                  dataIndex: "action",
                  key: "action",
                  render: (_, record) => {
                    return (
                      <div className="flex gap-2">
                        <Button onClick={() => clipboard(record)}>
                          <ContentCopyIcon sx={{ width: 15 }} />
                        </Button>
                        <Button
                          onClick={() => {
                            DeleteShortLinkApi.mutate(
                              {
                                id: record.id,
                              },
                              {
                                onSuccess: () => {
                                  toast.success("ลบสำเร็จ");
                                  getAllShortLinkApi.refetch();
                                },
                              }
                            );
                          }}
                        >
                          <DeleteIcon sx={{ width: 15 }} />
                        </Button>
                      </div>
                    );
                  },
                },
              ] as ColumnProps<ShortLink>[]
            }
          />
        </div>
      </Card>
    </>
  );
};

export default ShortLinkUser;
