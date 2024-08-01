import { NextPage } from "next";
import Logo from "@/assets/KU-TECH-Logo-TW.png";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const Footer: NextPage<Props> = () => {
  return (
    <div className="flex justify-center border-t-[1px] py-10">
      <div className="flex flex-col items-center">
        <Image src={Logo} alt="logo" width={100} />
        <div className="flex flex-col gap-2 items-center">
          <Link className="text-white" href="/privacy">
            Privacy Policy
          </Link>
          <div>Copyright © {new Date().getFullYear()} Technology Club of Kasetsart University </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
