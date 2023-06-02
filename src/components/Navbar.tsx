import { NextPage } from "next";
import { Navbar, Text, Link, Dropdown, Avatar } from "@nextui-org/react";
import Image from "next/image";
import LogoIcon from "@/assets/KU-TECH-Logo-TW.png";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRecoilState } from "recoil";
import { scrollSelectState } from "@/store/scrollTriger";

interface Props {}

const NavbarComponent: NextPage<Props> = () => {
  const { push, pathname } = useRouter();
  const { data: session, status } = useSession();

  const [collapseItems, setCollapseItems] = useState<
    {
      name: string;
      href: string;
      coreProtected?: boolean;
      isMobile?: boolean;
    }[]
  >([
    {
        name: "หน้าแรก",
        href: "/",
    },
    {
        name: "สมัครเป็นสมาชิก",
        href: "/join",
    },
    {
      name: "ข่าวสาร",
      href: "/news",
    },
    {
      name: "สมาชิก",
      href: "/members",
    },
    {
      name: "ติดต่อเรา",
      href: "/contact",
    },
  ]);

  const [targetScroll, setTargetScroll] = useRecoilState(scrollSelectState);

  return (
    <Navbar isBordered variant="sticky" className="bg-transparent">
      <Navbar.Brand onClick={() => push("/")} className="cursor-pointer">
        <Navbar.Toggle showIn={"sm"} aria-label="toggle navigation" />
        <Text hideIn={"sm"}>
          <Image src={LogoIcon} alt="ku tech logo" width={50} />
        </Text>
        <Text b size={"$2xl"} className="ml-3 rainbow clip-text" color="inherit">
          KU Tech
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        hideIn="sm"
        variant="highlight-rounded"
      >
        {collapseItems
          .filter((item) => !item.coreProtected)
          .map((item, index) => (
            <Navbar.Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setTargetScroll((pre) => ({ ...pre, target: null }));
                push(item.href);
                
              }}
              isActive={pathname === item.href}
              key={index}
            >
              {item.name}
            </Navbar.Link>
          ))}

        {collapseItems
          .filter((item) => item.coreProtected)
          .map((item, index) =>
            session?.user.isCoreTeam ? (
              <Navbar.Link
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setTargetScroll((pre) => ({ ...pre, target: null }));
                  push(item.href);
                }}
                isActive={pathname === item.href}
                key={index}
              >
                {item.name}
              </Navbar.Link>
            ) : (
              ""
            )
          )}
      </Navbar.Content>

      <Navbar.Content>
        {status === "authenticated" ? (
          <>
            {session.user.given_name}
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="primary"
                    size="md"
                    src={
                      session.user.customProfileImage
                        ? `https://s3.kutech.club/production-core-team/${session.user.customProfileImage}`
                        : session.user.picture
                    }
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu aria-label="User menu actions" color="secondary">
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {session.user.email}
                  </Text>
                </Dropdown.Item>

                {session?.user.isCoreTeam ? (
                  <Dropdown.Item key="core" withDivider color="primary">
                    <div onClick={() => push("/core")}> Core</div>
                  </Dropdown.Item>
                ) : (
                  null!
                )}

                {session?.user.isMember ? (
                  <Dropdown.Item key="short-link" withDivider color="primary">
                    <div onClick={() => push("/user/short-link")}>ย่อลิงก์</div>
                  </Dropdown.Item>
                ) : (
                  null!
                )}

                <Dropdown.Item key="logout" withDivider color="error">
                  <div onClick={() => signOut()}>Log Out</div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        ) : (
          <a
            href={`/sign-in?callbackUrl=/`}
            className="flex cursor-pointer items-center gap-1 rounded-lg p-3 text-white duration-200 hover:bg-white/5"
          >
            <Icon
              className="text-2xl"
              icon="material-symbols:last-page-rounded"
            />
            <div>เข้าสู่ระบบ</div>
          </a>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems
          .filter((item) => !item.coreProtected)
          .map((item, index) => (
            <Navbar.CollapseItem key={index}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  push(item.href);
                }}
              >
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        {collapseItems
          .filter((item) => item.coreProtected)
          .map((item, index) =>
            session?.user.isCoreTeam ? (
              <Navbar.CollapseItem key={index}>
                <Link
                  color="inherit"
                  css={{
                    minWidth: "100%",
                  }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    push(item.href);
                  }}
                >
                  {item.name}
                </Link>
              </Navbar.CollapseItem>
            ) : (
              ""
            )
          )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
