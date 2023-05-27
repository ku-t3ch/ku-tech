import { Button, Text } from "@nextui-org/react";
import { hasCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface Props {}

const CookieConsentFooter: NextPage<Props> = () => {
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(true);
    setCookie("localConsent", "true", {});
  };

  return (
    <>
      {!showConsent && (
        <div className="fixed z-10 bottom-0 right-0 left-0 flex items-center gap-3 bg-white/5 p-5 backdrop-blur-md ">
          <div className="mx-auto flex max-w-[73rem] flex-col items-center justify-center gap-5 text-center md:flex-row md:text-left">
            <div onClick={()=>setShowConsent(true)} className="absolute top-1 right-1 cursor-pointer">
                <CloseIcon sx={{width:14}} />
            </div>
            <Text>
              เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
              และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
              คุณสามารถศึกษารายละเอียดได้ที่{" "}
              <Link href="/privacy">นโยบายความเป็นส่วนตัว</Link>
            </Text>
            <Button size={"sm"} onClick={acceptCookie} color={"gradient"} className="w-fit">
              ยอมรับ
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentFooter;
