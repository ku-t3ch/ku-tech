const WithNavbar = dynamic(() => import('@/layouts/WithNavbar'), {
  ssr: false,
});

import dynamic from 'next/dynamic';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { type ReactNode, createContext } from 'react';

const NavbarContext = createContext(null);

interface Props {
  children: ReactNode;
}

const withNavbar: Array<string> = [
  '/',
  '/news',
  '/news/[id]',
  '/404',
  '/about-club',
  '/activities',
  '/events',
  '/join',
  '/members',
  '/privacy',
  '/sponsors',
  '/works',
  '/core',
  '/user/short-link',
  '/logo',
];

export const NavbarContextProvider: NextPage<Props> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <NavbarContext.Provider value={null}>
      {withNavbar.includes(pathname) ? (
        <WithNavbar>{children}</WithNavbar>
      ) : (
        children
      )}
    </NavbarContext.Provider>
  );
};
