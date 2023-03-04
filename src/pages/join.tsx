import { Button, Text, Loading } from "@nextui-org/react";
import { NextPage, NextPageContext } from "next";
import { AutoComplete, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import facultyData from "@/assets/faculty.json";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "usehooks-ts";
import { FormDataInterface } from "@/interfaces/FormDataInterface";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/server/db";
import { useSession } from "next-auth/react";

const TextArea = dynamic(() => import("antd/es/input/TextArea"), {
  ssr: false,
});

const UploadComponent = dynamic(() => import("@/components/UploadComponent"), {
  ssr: false,
});

const Turnstile = dynamic(() => import("react-turnstile"), {
  ssr: false,
});

export async function getServerSideProps(context: NextPageContext) {
  let token = await getToken({
    req: context.req as any,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const isRegistedRaw = await prisma.request.findUnique({
    where: {
      google_id: token?.sub,
    },
  });

  let isRegisted = false;

  if (
    isRegistedRaw?.first_name_en ||
    isRegistedRaw?.last_name_en ||
    isRegistedRaw?.first_name_th ||
    isRegistedRaw?.last_name_th ||
    isRegistedRaw?.faculty ||
    isRegistedRaw?.major
  ) {
    isRegisted = true;
  }

  return {
    props: {
      isRegisted,
    },
  };
}

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {
  isRegisted: boolean;
}

const Join: NextPage<Props> = ({ isRegisted }) => {
  const [token, setToken] = useState<string | null>(null);
  const [Faculty, setFaculty] = useState<string | null>(null);
  const [FormLocalStorage, setFormLocalStorage] =
    useLocalStorage<FormDataInterface | null>("formData", null);
  const [form] = Form.useForm();
  const [hasImage, setHasImage] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [CT, setCT] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    if (FormLocalStorage !== null) {
      form.setFieldsValue(FormLocalStorage);
    }
  }, []);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} รูปแบบ email ไม่ถูกต้อง!",
      number: "${label} is not a validate number!",
    },
  };

  const joinApi = api.join.add.useMutation();

  const onFinish = async (values: any) => {
    if (!hasImage) return toast.error("กรุณาอัพโหลดรูปภาพ");
    if (token === null)
      return toast.error("เกิดข้อผิดพลาด กรุณารีหน้าเว็บไชต์ใหม่");
    await joinApi.mutateAsync({
      data: form.getFieldsValue(),
      token,
    });
    setCT((pre) => pre + 1);
  };

  useEffect(() => {
    if (joinApi.isSuccess) {
      if (!isFirst) {
        toast.success("สมัครสำเร็จ");
      }
      setIsFirst(true);
      form.resetFields();
      setFormLocalStorage(null);
      window.location.reload();
    } else if (joinApi.isLoading) {
      toast.loading("กำลังสมัครสมาชิก");
    } else if (joinApi.isError) {
      toast.error(joinApi.error.message);
    }
  }, [joinApi]);

  const ThaiValidator = (rule: any, value: any, callback: any) => {
    const thaiNameRegex = /^[ก-๙]+$/;
    if (!thaiNameRegex.test(value)) {
      callback("กรุณากรอกภาษาไทยเท่านั้น");
    } else {
      callback();
    }
  };
  const EnglishValidator = (rule: any, value: any, callback: any) => {
    const englishNameRegex = /^[a-zA-Z]+$/;
    if (!englishNameRegex.test(value)) {
      callback("กรุณากรอกภาษาอังกฤษเท่านั้น");
    } else {
      callback();
    }
  };

  const KuEmailValidator = (rule: any, value: any, callback: any) => {
    const kuEmailRegex = /^[a-zA-Z0-9._%+-]+@ku\.th$/;
    if (!kuEmailRegex.test(value)) {
      callback("กรุณากรอกอีเมล์ @ku.th เท่านั้น");
    } else {
      callback();
    }
  };

  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            เข้าร่วมชมรม
          </Text>
          {isRegisted ? (
            <Text className="prompt" size={"$xl"}>
              คุณได้สมัครเข้าร่วมชมรมแล้ว รอการตอบรับจากทางชมรม ผ่านทาง Email 🙏
            </Text>
          ) : (
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              validateMessages={validateMessages}
              onValuesChange={(changedValues, allValues) => {
                setFormLocalStorage(allValues);
              }}
            >
              <div className="flex w-full flex-col md:flex-row md:gap-5">
                <Form.Item
                  className="w-full"
                  label="ชื่อ (ภาษาไทย)"
                  name="first_name_th"
                  rules={[
                    { required: true },
                    {
                      validator: ThaiValidator,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    lang="th"
                    placeholder="ชื่อจริง (ภาษาไทย)"
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="นามสกุล (ภาษาไทย)"
                  name="last_name_th"
                  rules={[{ required: true }, { validator: ThaiValidator }]}
                >
                  <Input
                    lang="th"
                    size="large"
                    placeholder="นามสกุล (ภาษาไทย)"
                  />
                </Form.Item>
              </div>
              <div className="flex w-full flex-col md:flex-row md:gap-5">
                <Form.Item
                  className="w-full"
                  label="ชื่อ (ภาษาอังกฤษ)"
                  name="first_name_en"
                  rules={[{ required: true }, { validator: EnglishValidator }]}
                >
                  <Input
                    lang="en"
                    size="large"
                    placeholder="ชื่อจริง (ภาษาอังกฤษ)"
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="นามสกุล (ภาษาอังกฤษ)"
                  name="last_name_en"
                  rules={[{ required: true }, { validator: EnglishValidator }]}
                >
                  <Input
                    lang="en"
                    size="large"
                    placeholder="นามสกุล (ภาษาอังกฤษ)"
                  />
                </Form.Item>
              </div>
              <div className="flex w-full flex-col md:flex-row md:gap-5">
                <Form.Item
                  className="w-full"
                  label="ชื่อเล่น"
                  name="nick_name"
                  rules={[{ required: true }, { validator: ThaiValidator }]}
                >
                  <Input size="large" placeholder="ชื่อเล่น" />
                </Form.Item>
                <Form.Item
                  rules={[
                    { type: "email", required: true },
                    {
                      validator: KuEmailValidator,
                    },
                  ]}
                  className="w-full"
                  label="อีเมล"
                  name="email"
                >
                  <Input size="large" placeholder="example@ku.th" />
                </Form.Item>
              </div>
              <div className="flex w-full flex-col md:flex-row md:gap-5">
                <Form.Item
                  className="w-full"
                  label="ชั้นปี"
                  name="year"
                  rules={[{ required: true }]}
                >
                  <Select size="large" placeholder="เลือกชั้นปี">
                    <Select.Option value={1}>ปี 1</Select.Option>
                    <Select.Option value={2}>ปี 2</Select.Option>
                    <Select.Option value={3}>ปี 3</Select.Option>
                    <Select.Option value={4}>ปี 4</Select.Option>
                    <Select.Option value={5}>ปี 5</Select.Option>
                    <Select.Option value={6}>ปี 6</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex w-full flex-col md:flex-row md:gap-5">
                <Form.Item
                  className="w-full"
                  label="คณะ"
                  name="faculty"
                  rules={[{ required: true }]}
                >
                  <AutoComplete
                    popupClassName="certain-category-search-dropdown"
                    placeholder="เลือกคณะ"
                    size="large"
                    onSelect={(value) => setFaculty(value)}
                    onChange={(value) => {
                      if (value.length === 0) {
                        setFaculty(null);
                      }
                    }}
                    options={facultyData}
                    filterOption={(inputValue, option) =>
                      option!.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  ></AutoComplete>
                </Form.Item>
              </div>
              {Faculty || form.getFieldValue("major") ? (
                <div>
                  <Form.Item
                    className="w-full"
                    label="สาขา"
                    name="major"
                    rules={[{ required: true }]}
                  >
                    <AutoComplete
                      popupClassName="certain-category-search-dropdown"
                      size="large"
                      placeholder="เลือกสาขา"
                      options={facultyData
                        .filter((option) => option.value === Faculty)[0]
                        ?.majors.map((item) => {
                          return { value: item };
                        })}
                      filterOption={(inputValue, option) =>
                        option?.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    ></AutoComplete>
                  </Form.Item>
                </div>
              ) : (
                ""
              )}
              <Form.Item
                className="w-full"
                label="ทำไมคุณถึงอยากเข้าร่วมชมรมของเรา"
                name="ojectives"
                rules={[{ required: true }]}
              >
                <TextArea name="" rows={4} />
              </Form.Item>
              <Form.Item
                className="w-full"
                label="รูปสำเนาบัตรนิสิต (กรุณาเซ็นสำเนาถูกต้องด้วย) หรือใช้รูปบัตรใน Application NisitKU ได้"
                required
              >
                <UploadComponent onReady={(v) => setHasImage(v)} />
                <Text color="error">
                  *เพื่อความปลอดภัย ท่านควรขีดฆ่าเลขบัตร Master Card ของท่านออก
                </Text>
              </Form.Item>
              <div className="flex flex-col items-center gap-3">
                <Turnstile
                  sitekey={process.env.NEXT_PUBLIC_CT_SITE_KEY!}
                  onVerify={(token) => setToken(token)}
                  key={CT}
                />
                <Button
                  color={"gradient"}
                  shadow
                  style={{ width: "100%" }}
                  type="submit"
                >
                  {joinApi.isLoading ? (
                    <Loading color="currentColor" size="sm" />
                  ) : (
                    "สมัครสมาชิก"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </WithNavbar>
  );
};

export default Join;
