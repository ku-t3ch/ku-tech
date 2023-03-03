import { NextPage } from "next";
import { Button, Navbar, Text, Link } from "@nextui-org/react";
import NextLink from "next/link";
import Image from "next/image";
import LogoIcon from "@/assets/logo.png";
import { useRouter } from "next/router";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut, useSession } from "next-auth/react";

interface Props {}

const NavbarComponent: NextPage<Props> = () => {
  const { push, pathname } = useRouter();
  const { data: session, status } = useSession();

  const collapseItems = [
    {
      name: "เกี่ยวกับชมรม",
      href: "/about-club",
    },
    {
      name: "กิจกรรม",
      href: "/activities",
    },
    // {
    //   name: "กำหนดการ",
    //   href: "/events",
    // },
    // {
    //   name: "ผลงาน",
    //   href: "/works",
    // },
    // {
    //   name: "ผู้สนับสนุน",
    //   href: "/sponsors",
    // },
    {
      name: "ติดต่อเรา",
      href: "/contact",
    },
  ];

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand onClick={() => push("/")} className="cursor-pointer">
        <Navbar.Toggle showIn={"sm"} aria-label="toggle navigation" />
        <Text hideIn={"sm"}>
          <Image src={LogoIcon} alt="ku tech logo" width={50} />
        </Text>
        <Text b size={"$2xl"} className="ml-3" color="inherit">
          KU Tech
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        hideIn="sm"
        variant="highlight-rounded"
      >
        {collapseItems.map((item, index) => (
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
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <Button
            auto
            size={"sm"}
            rounded
            icon={<LaunchIcon sx={{ width: 20 }} className="animate-pulse" />}
            color="gradient"
            shadow
            bordered
            as={Link}
            href="/join"
            target="_blank"
          >
            เข้าร่วมชมรม
          </Button>
        </Navbar.Item>
        {status === "authenticated" && (
          <Navbar.Item hideIn={"md"}>
            <Button
              auto
              size={"sm"}
              rounded
              color="error"
              shadow
              bordered
              onClick={() => signOut()}
            >
              <LogoutIcon />
            </Button>
          </Navbar.Item>
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
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
        {status === "authenticated" && (
          <Navbar.CollapseItem>
            <Button
              auto
              size={"sm"}
              rounded
              color="error"
              shadow
              bordered
              onClick={() => signOut()}
            >
              <LogoutIcon />
            </Button>
          </Navbar.CollapseItem>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
