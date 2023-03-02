import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import { Form } from "antd";
import { useState } from "react";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

type RequiredMark = boolean | "optional";

interface Props {}

const Join: NextPage<Props> = () => {
  const [token, setToken] = useState<string | null>(null);

  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");
  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  console.log(form);

  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            เข้าร่วมชมรม
          </Text>
          <Text className="prompt" size={"$xl"}>
            Line Group Member :{" "}
            <a href="https://line.me/ti/g/mpcZOXKJaN" target="_blank">
              https://line.me/ti/g/mpcZOXKJaN
            </a>
          </Text>
          {/* <Form
            form={form}
            layout="vertical"
            onValuesChange={onRequiredTypeChange}
            requiredMark={true}
          >
            <div className="flex w-full flex-col md:flex-row md:gap-5">
              <Form.Item className="w-full" label="ชื่อ (ภาษาไทย)" required>
                <Input size="large" placeholder="ชื่อจริง (ภาษาไทย)" />
              </Form.Item>
              <Form.Item className="w-full" label="นามสกุล (ภาษาไทย)" required>
                <Input size="large" placeholder="นามสกุล (ภาษาไทย)" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-5">
              <Form.Item className="w-full" label="ชื่อ (ภาษาอังกฤษ)" required>
                <Input size="large" placeholder="ชื่อจริง (ภาษาอังกฤษ)" />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="นามสกุล (ภาษาอังกฤษ)"
                required
              >
                <Input size="large" placeholder="นามสกุล (ภาษาอังกฤษ)" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-5">
              <Form.Item className="w-full" label="ชื่อเล่น" required>
                <Input size="large" placeholder="ชื่อเล่น" />
              </Form.Item>
              <Form.Item className="w-full" label="อีเมล" required>
                <Input size="large" placeholder="example@example.com" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-5">
              <Form.Item className="w-full" label="ชั้นปี" required>
                <Select size="large" placeholder="เลือกชั้นปี">
                  <Select.Option value="1">ปี 1</Select.Option>
                  <Select.Option value="2">ปี 2</Select.Option>
                  <Select.Option value="3">ปี 3</Select.Option>
                  <Select.Option value="4">ปี 4</Select.Option>
                  <Select.Option value="5">ปี 5</Select.Option>
                  <Select.Option value="6">ปี 6</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex w-full flex-col md:flex-row md:gap-5">
              <Form.Item className="w-full" label="คณะ" required>
                <Input size="large" />
              </Form.Item>
              <Form.Item className="w-full" label="สาขา" required>
                <Input size="large" />
              </Form.Item>
            </div>
          </Form>
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_CT_SITE_KEY!}
            onVerify={(token) => setToken(token)}
            
          />
          <Button color={"gradient"} shadow auto>
            เข้าร่วม
          </Button> */}
        </div>
      </div>
    </WithNavbar>
  );
};

export default Join;
