import { NextPage } from "next";
import {
  Button,
  Navbar,
  Text,
  Link,
  Dropdown,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import LogoIcon from "@/assets/KU-TECH-Logo-TW.png";
import { useRouter } from "next/router";
import LaunchIcon from "@mui/icons-material/Launch";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { findLastKey } from "lodash";

interface Props {}

const NavbarComponent: NextPage<Props> = () => {
  const { push, pathname } = useRouter();
  const { data: session, status } = useSession();

  const [collapseItems, setCollapseItems] = useState<
    {
      name: string;
      href: string;
      coreProtected?: boolean;
    }[]
  >([
    {
      name: "เกี่ยวกับชมรม",
      href: "/about-club",
    },
    {
      name: "ข่าวสาร",
      href: "/news",
    },
    {
      name: "กิจกรรม",
      href: "/activities",
    },
    {
      name: "สมาชิก",
      href: "/members",
    },
    {
      name: "ย่อลิงก์",
      href: "/user/short-link",
    },
    {
      name: "ติดต่อเรา",
      href: "/contact",
    },
    // {
    //   name: "core",
    //   href: "/core",
    //   coreProtected: true,
    // },
  ]);

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand onClick={() => push("/")} className="cursor-pointer">
        <Navbar.Toggle showIn={"md"} aria-label="toggle navigation" />
        <Text hideIn={"md"}>
          <Image src={LogoIcon} alt="ku tech logo" width={50} />
        </Text>
        <Text b size={"$2xl"} className="ml-3" color="inherit">
          KU Tech
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        hideIn="md"
        variant="highlight-rounded"
      >
        {collapseItems
          .filter((item) => !item.coreProtected)
          .map((item, index) => (
            <Navbar.Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
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
                    src={session.user.picture}
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
                    <Navbar.Link
                      href="/core"
                      onClick={(e) => {
                        e.preventDefault();
                        push("/core");
                      }}
                      isActive={pathname === "/core"}
                      key="core"
                    >
                      Core
                    </Navbar.Link>
                  </Dropdown.Item>
                ) : (
                  null!
                )}

                {session?.user.isMember ? (
                  <Dropdown.Item key="short-link" withDivider color="primary">
                    <Navbar.Link
                      href="/user/short-link"
                      onClick={(e) => {
                        e.preventDefault();
                        push("/user/short-link");
                      }}
                      isActive={pathname === "/user/short-link"}
                      key="short-link"
                    >
                      ย่อลิงก์
                    </Navbar.Link>
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
          <Button
            auto
            size={"md"}
            rounded
            color="gradient"
            shadow
            bordered
            as={Link}
            href={`/sign-in?callbackUrl=/`}
          >
            เข้าสู่ระบบ
          </Button>
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
