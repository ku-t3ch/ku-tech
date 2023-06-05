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

interface Props { }

const NavbarComponent: NextPage<Props> = () => {
  const { push, pathname } = useRouter();
  const { data: session, status } = useSession();

  const [dropdownItems, setDropdownItems] = useState<
    {
      name: string;
      href: string;
      coreProtected?: boolean;
      isMobile?: boolean;
      isMember?: boolean;
    }[]
  >([
    {
      name: "ย่อลิงก์",
      href: "/user/short-link"
    }
  ])

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
        variant="default"
      >
        <Navbar.Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setTargetScroll((pre) => ({ ...pre, target: null }));
            push("/");
          }}
          isActive={pathname === "/"}
          key={0}
        >
          หน้าแรก
        </Navbar.Link>

        <Navbar.Link
          href="/join"
          onClick={(e) => {
            e.preventDefault();
            setTargetScroll((pre) => ({ ...pre, target: null }));
            push("/join");
          }}
          isActive={pathname === "/join"}
          key={1}
        >
          {session?.user.isMember ? "ประกาศ" : "สมัครสมาชิก"}
        </Navbar.Link>

        <Navbar.Link
          href="/news"
          onClick={(e) => {
            e.preventDefault();
            setTargetScroll((pre) => ({ ...pre, target: null }));
            push("/news");
          }}
          isActive={pathname === "/news"}
          key={2}
        >
          ข่าวสาร
        </Navbar.Link>

        <Navbar.Link
          href="/members"
          onClick={(e) => {
            e.preventDefault();
            setTargetScroll((pre) => ({ ...pre, target: null }));
            push("/members");
          }}
          isActive={pathname === "/members"}
          key={3}
        >
          สมาชิก
        </Navbar.Link>

        <Navbar.Link
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            setTargetScroll((pre) => ({ ...pre, target: null }));
            push("/contact");
          }}
          isActive={pathname === "/contact"}
          key={4}
        >
          ติดต่อเรา
        </Navbar.Link>

        {session?.user.isMember && status === "authenticated" ? (
          <Navbar.Link>
            <Dropdown>
              <Navbar.Item >
                <Dropdown.Trigger>
                  ระบบ
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu aria-label="User menu actions" color="secondary">
                {dropdownItems.map((item, index) => (
                  <Dropdown.Item key={index} color="primary">
                    <div onClick={() => push(item.href)}>{item.name}</div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Link>
        ) : null!}
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
                    <div onClick={() => push("/core")}> โปรไฟล์</div>
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
        <Navbar.CollapseItem key={0}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              push("/");
            }}
          >
            หน้าแรก
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={1}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/join"
            onClick={(e) => {
              e.preventDefault();
              push("/join");
            }}
          >
            {session?.user.isMember ? "ประกาศ" : "สมัครสมาชิก"}
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={2}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/news"
            onClick={(e) => {
              e.preventDefault();
              push("/news");
            }}
          >
            ข่าวสาร
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={3}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/members"
            onClick={(e) => {
              e.preventDefault();
              push("/members");
            }}
          >
            สมาชิก
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={4}>
          <Link
            color="inherit"
            css={{
              minWidth: "100%",
            }}
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              push("/contact");
            }}
          >
            ติดต่อเรา
          </Link>
        </Navbar.CollapseItem>
        {session?.user.isMember && status === "authenticated" ? (
          dropdownItems.map((item, index) => (
            <Navbar.CollapseItem key={5+index}>
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
                ระบบ: {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))
        ) : null!}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
