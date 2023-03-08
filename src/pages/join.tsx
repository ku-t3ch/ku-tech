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

  const dataDB = await prisma.request.findUnique({
    where: {
      google_id: token?.sub,
    },
  });
  

  let isRegisted = false;

  if (
    dataDB?.first_name_en ||
    dataDB?.last_name_en ||
    dataDB?.first_name_th ||
    dataDB?.last_name_th ||
    dataDB?.faculty ||
    dataDB?.major
  ) {
    isRegisted = true;
  }

  return {
    props: {
      isRegisted,
      isApproved: dataDB?.is_approved || false,
    },
  };
}

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {
  isRegisted: boolean;
  isApproved: boolean;
}

const Join: NextPage<Props> = ({ isRegisted, isApproved }) => {
  const [token, setToken] = useState<string | null>(null);
  const [Faculty, setFaculty] = useState<string | null>(null);
  const [FormLocalStorage, setFormLocalStorage] =
    useLocalStorage<FormDataInterface | null>("formData", null);
  const [form] = Form.useForm();
  const [hasImage, setHasImage] = useState(false);
  const [CT, setCT] = useState(1);

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

  const onFinish = async () => {
    if (!hasImage) return toast.error("กรุณาอัพโหลดรูปภาพ");
    if (token === null)
      return toast.error("เกิดข้อผิดพลาด กรุณารีหน้าเว็บไชต์ใหม่");
    let key = toast.loading("กำลังสมัครสมาชิก");
    await joinApi.mutate(
      {
        data: form.getFieldsValue(),
        token,
      },
      {
        onSuccess: () => {
          toast.success("สมัครสำเร็จ", {
            id: key,
          });
          form.resetFields();
          setFormLocalStorage(null);
          window.location.reload();
        },
        onError: ({ message }) => {
          toast.error(message, {
            id: key,
          });
          setCT((pre) => pre + 1);
        },
      }
    );
  };

  const ThaiValidator = (_: any, value: any) => {
    const thaiNameRegex = /^[ก-๙\s]+$/;
    if (!thaiNameRegex.test(value)) {
      return Promise.reject("กรุณากรอกภาษาไทยเท่านั้น");
    } else {
      return Promise.resolve();
    }
  };

  const EnglishValidator = (_: any, value: any) => {
    const englishNameRegex = /^[a-zA-Z\s]+$/;
    if (!englishNameRegex.test(value)) {
      return Promise.reject("กรุณากรอกภาษาอังกฤษเท่านั้น");
    } else {
      return Promise.resolve();
    }
  };

  const KuEmailValidator = (_: any, value: any) => {
    const kuEmailRegex = /^[a-z0-9._%+-]+@ku\.th$/;
    if (!kuEmailRegex.test(value)) {
      return Promise.reject(
        "กรุณากรอกอีเมล์ @ku.th เท่านั้น (ต้องเป็นตัวเล็กทั้งหมด)"
      );
    } else {
      return Promise.resolve();
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
            <>
              {isApproved ? (
                <div className="flex flex-col">
                  <Text className="prompt" size={"$xl"}>
                    Congratulations! 🎉 คุณได้รับการอนุมัติเข้าร่วมชมรมแล้ว
                  </Text>
                  <Text className="prompt" size={"$xl"}>
                    Line :{" "}
                    <a href="https://line.me/ti/g/gbU_JbD-DV" target="_blank">
                      https://line.me/ti/g/gbU_JbD-DV
                    </a>
                  </Text>
                  <Text className="prompt" size={"$xl"}>
                    Discord :{" "}
                    <a href="https://discord.gg/daxY4By4DV" target="_blank">
                      https://discord.gg/daxY4By4DV
                    </a>
                  </Text>
                </div>
              ) : (
                <Text className="prompt" size={"$xl"}>
                  คุณได้สมัครเข้าร่วมชมรมแล้ว รอการตอบรับจากทางชมรม ผ่านทาง
                  Email 🙏
                </Text>
              )}
            </>
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
                label="รูปสำเนาบัตรนิสิต หรือใช้รูปบัตรใน Application NisitKU ได้ (กรุณาเซ็นสำเนาถูกต้องด้วย)"
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
