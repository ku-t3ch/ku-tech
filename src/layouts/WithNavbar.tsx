import Footer from "@/components/Footer";
import NavbarComponent from "@/components/Navbar";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const WithNavbar: NextPage<Props> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
        <NavbarComponent />
        {children}
    </div>
  );
};

export default WithNavbar;
