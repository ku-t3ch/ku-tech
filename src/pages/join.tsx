import Link from "next/link";
import dynamic from "next/dynamic";
import facultyData from "@/assets/faculty.json";

import { type FormDataInterface } from "@/interfaces/FormDataInterface";

import { NextPage } from "next";
import { useEffect, useState } from "react";
// import { NextPage, NextPageContext } from "next";

import { toast } from "react-hot-toast";
import { Button, Text, Loading } from "@nextui-org/react";
import { AutoComplete, Checkbox, Form, Input, Select, Skeleton } from "antd";

import { api } from "@/utils/api";
// import { prisma } from "@/server/db";
// import { getToken } from "next-auth/jwt";
// import { useSession } from "next-auth/react";
import { useLocalStorage } from "usehooks-ts";
import { useReCaptcha } from "next-recaptcha-v3";

const TextArea = dynamic(() => import("antd/es/input/TextArea"), {
  ssr: false,
});

const UploadComponent = dynamic(() => import("@/components/UploadComponent"), {
  ssr: false,
});

// const Turnstile = dynamic(() => import("react-turnstile"), {
//   ssr: false,
// });

// export async function getServerSideProps(context: NextPageContext) {
//   let token = await getToken({
//     req: context.req as any,
//     secret: process.env.NEXTAUTH_SECRET!,
//   });

//   const dataDB = await prisma.request.findUnique({
//     where: {
//       google_id: token?.sub,
//     },
//   });

//   let isRegisted = false;

//   if (
//     dataDB?.first_name_en ||
//     dataDB?.last_name_en ||
//     dataDB?.first_name_th ||
//     dataDB?.last_name_th ||
//     dataDB?.faculty ||
//     dataDB?.major
//   ) {
//     isRegisted = true;
//   }

//   return {
//     props: {
//       isRegisted,
//       isApproved: dataDB?.is_approved || false,
//     },
//   };
// }

interface Props {
  isRegisted?: boolean;
  isApproved?: boolean;
}

const Join: NextPage<Props> = () => {
  const [token, setToken] = useState<string | null>(null);
  const [Faculty, setFaculty] = useState<string | null>(null);
  const [FormLocalStorage, setFormLocalStorage] =
    useLocalStorage<FormDataInterface | null>("formData", null);
  const [form] = Form.useForm();
  const [hasImage, setHasImage] = useState(false);
  const [CT, setCT] = useState(1);
  const { executeRecaptcha } = useReCaptcha();
  const [AceptPrivacy, setAceptPrivacy] = useState(false);

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
  const checkApproveApi = api.join.checkApprove.useQuery(undefined);

  const onFinish = async () => {
    if (!hasImage) return toast.error("กรุณาอัพโหลดรูปภาพ");

    const token = await executeRecaptcha("form_submit");

    if (token === null)
      return toast.error("เกิดข้อผิดพลาด กรุณารีหน้าเว็บไชต์ใหม่");

    if (!AceptPrivacy) return toast.error("กรุณายอมรับนโยบายความเป็นส่วนตัว");

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

  const { isRegisted, isApproved, message } = checkApproveApi.data || {
    isRegisted: false,
    isApproved: false,
    message: {
      line: "" as string | null,
      discord: "" as string | null,
    },
  };

  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      {/* <div className="text-3xl text-center">
        {`cout << "ปิดปรับปรุงระบบ" << endl;`}
        </div> */}
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          เข้าร่วมกลุ่ม
        </Text>
        {!checkApproveApi.isLoading ? (
          <>
            {isRegisted ? (
              <>
                {isApproved ? (
                  <div className="flex flex-col">
                    <Text className="prompt" size={"$xl"}>
                      Congratulations! 🎉 คุณได้รับการอนุมัติเข้าร่วมกลุ่มแล้ว
                    </Text>
                    <Text className="prompt" size={"$xl"}>
                      Line :{" "}
                      <a
                        href={message.line ? message.line : ""}
                        target="_blank"
                      >
                        {message.line ? message.line : ""}
                      </a>
                    </Text>
                    <Text className="prompt" size={"$xl"}>
                      Discord :{" "}
                      <a
                        href={message.discord ? message.discord : ""}
                        target="_blank"
                      >
                        {message.discord ? message.discord : ""}
                      </a>
                    </Text>
                  </div>
                ) : (
                  <Text className="prompt" size={"$xl"}>
                    คุณได้สมัครเข้าร่วมกลุ่มแล้ว รอการตอบรับจากทางกลุ่ม ผ่านทาง
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
                    rules={[
                      { required: true },
                      { validator: EnglishValidator },
                    ]}
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
                    rules={[
                      { required: true },
                      { validator: EnglishValidator },
                    ]}
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
                  label="ทำไมคุณถึงอยากเข้าร่วมกลุ่มของเรา"
                  name="ojectives"
                  rules={[{ required: true }]}
                >
                  <TextArea name="" rows={4} />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Discord Tag"
                  name="discord_tag"
                  rules={[{ required: true }]}
                >
                  <Input lang="en" size="large" placeholder="Holilope#3811" />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label={
                    <div>
                      รูปสำเนาบัตรนิสิต หรือใช้รูปบัตรใน Application NisitKU ได้{" "}
                      <span className="font-bold text-red-500">
                        (กรุณาเซ็นสำเนาถูกต้องด้วย)
                      </span>
                    </div>
                  }
                  required
                >
                  <UploadComponent
                    action="/api/image_upload"
                    onReady={(v) => setHasImage(v)}
                  />
                  <div className="text-lg font-bold text-red-500">
                    *เพื่อความปลอดภัย ท่านควรขีดฆ่าเลขบัตร Master Card
                    ของท่านออก
                  </div>
                </Form.Item>
                <Form.Item>
                  <Checkbox onChange={(v) => setAceptPrivacy(v.target.checked)}>
                    ยอมรับ <Link href={"/privacy"}>นโยบายความเป็นส่วนตัว</Link>
                  </Checkbox>
                </Form.Item>
                <div className="flex flex-col items-center gap-3">
                  <Button
                    color={"gradient"}
                    shadow
                    style={{ width: "100%" }}
                    type="submit"
                  >
                    {joinApi.isPending ? (
                      <Loading color="currentColor" size="sm" />
                    ) : (
                      "สมัครสมาชิก"
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </>
        ) : (
          <Skeleton active paragraph={{ rows: 4 }} />
        )}
      </div>
    </div>
  );
};

export default Join;

// {/* <Turnstile
//                       sitekey={process.env.NEXT_PUBLIC_CT_SITE_KEY!}
//                       onVerify={(token) => setToken(token)}
//                       key={CT}
//                     /> */}
