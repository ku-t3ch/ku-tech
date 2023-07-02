import { NextPage } from 'next';
import NavbarComponent from '@/components/Navbar';

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
