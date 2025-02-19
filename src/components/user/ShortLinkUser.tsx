import { api } from "@/utils/api";
import { ShortLink } from "@prisma/client";
import { Form, Card, Input, Button, Table } from "antd";
import { ColumnProps } from "antd/es/table";
import _ from "lodash";
import { NextPage } from "next";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { QRCodeSVG } from 'qrcode.react';

interface Props { }

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
    navigator.clipboard.writeText(`https://tech.nisit.ku.ac.th/g/${item.short_link}`);
    toast.success(`Copied https://tech.nisit.ku.ac.th/g/${item.short_link}`);
  };

  const URLValidator = async (_: any, value: any) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(value)) {
      return Promise.reject("กรุณากรอก URL ให้ถูกต้อง");
    } else {
      return Promise.resolve();
    }
  };

  const copyQRToClipboard = async (shortLink: string) => {
    try {
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
  
      const largeQRSize = 512;
      const ReactDOMServer = (await import('react-dom/server')).default;
      const qrSvg = ReactDOMServer.renderToString(
        <QRCodeSVG
          value={`https://tech.nisit.ku.ac.th/g/${shortLink}`}
          size={largeQRSize}
          level="H"
          includeMargin={true}
        />
      );
      tempDiv.innerHTML = qrSvg;
  
      const svg = tempDiv.querySelector('svg') as SVGElement;
      const svgData = new XMLSerializer().serializeToString(svg);
      
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      });
  
      canvas.width = largeQRSize;
      canvas.height = largeQRSize;
      ctx?.drawImage(img, 0, 0);
  
      const blob = await new Promise<Blob>((resolve) => 
        canvas.toBlob((blob) => resolve(blob!), 'image/png', 1.0) // คุณภาพสูงสุด
      );
  
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
  
      document.body.removeChild(tempDiv);
  
      toast.success('คัดลอก QR Code แล้ว');
    } catch (error) {
      toast.error('ไม่สามารถคัดลอก QR Code ได้');
      console.error('Error copying QR code:', error);
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
                  title: "QR Code",
                  dataIndex: "qr_code",
                  key: "qr_code",
                  render: (_, record) => (
                    <div className="flex flex-col items-center gap-2">
                      <QRCodeSVG
                        id={`qr-${record.short_link}`}
                        value={`https://tech.nisit.ku.ac.th/g/${record.short_link}`}
                        size={64}
                        level="L"
                        includeMargin={true}
                      />
                      <Button
                        size="small"
                        icon={<ContentCopyIcon sx={{ width: 15 }} />}
                        onClick={() => copyQRToClipboard(record.short_link!)}
                      >
                        คัดลอก
                      </Button>
                    </div>
                  )
                },
                {
                  title: "Short Link ID",
                  dataIndex: "short_link",
                  key: "short_link",
                },
                {
                  title: "Original Link",
                  dataIndex: "original_link",
                  render: (text) => (
                    <div className="w-40 truncate">{text}</div>
                  ),
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
