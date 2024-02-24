import Image from "next/image";
import LogoIcon from "@/assets/KU-TECH-Logo-TW.png";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { type NavItem } from "@/interfaces/NavbarInterface";

import { Icon } from "@iconify/react";
import { Navbar, Text, Dropdown, Avatar, Link } from "@nextui-org/react";

const navbarItems: NavItem[] = [
    {
        to: "/",
        label: "หน้าแรก",
    },
    {
        to: "/join",
        label: "สมัครสมาชิก",
        onlyNotRegistered: true,
    },
    {
        to: "/",
        label: "ข่าวสาร",
        dropdownItems: [
            {
                to: "/news",
                label: "General News",
                icon: <Icon icon="mingcute:announcement-line" />,
                description: "ข่าวสารทั่วไป",
            },
            {
                to: "/road-map/2566",
                label: "Road Map",
                icon: <Icon icon="carbon:roadmap" />,
                description: "แผนกิจกรรม",
            },
            {
                to: "/join",
                label: "Member News",
                icon: <Icon icon="iconamoon:news" />,
                description: "ข่าวสารสำหรับสมาชิก",
                onlyMember: true,
            },
        ],
    },
    {
        to: "/",
        label: "ระบบบริการสมาชิก",
        onlyMember: true,
        dropdownItems: [
            {
                to: "/user/short-link",
                icon: <Icon icon="gg:link" />,
                label: "Shortcut Link",
                description: "ระบบย่อลิงก์สำหรับสมาชิกชมรม",
            },
        ],
    },
    {
        to: "/",
        label: "ข้อมูลองค์กร",
        dropdownItems: [
            {
                to: "/history",
                label: "ประวัติชมรม",
                icon: <Icon icon="material-symbols:history" />,
                description: "ประวัติชมรม",
            },
            {
                to: "/members",
                label: "คณะกรรมการ",
                icon: <Icon icon="mdi:account-group-outline" />,
                description: "ข้อมูลคณะกรรมการชมรม",
            },
            {
                to: "/budget",
                label: "งบประมาณ",
                icon: <Icon icon="tabler:report-money" />,
                description: "งบประมาณของชมรม",
            },
        ]
    },

    {
        to: "/",
        label: "ดาวน์โหลด",
        dropdownItems: [
            {
                to: "/logo",
                label: "ตราสัญลักษณ์",
                icon: <Icon icon="material-symbols:imagesmode-outline" />,
                description: "ตราสัญลักษณ์ของชมรม",
            },
            {
                to: "/documents-download",
                label: "เอกสารชมรม",
                icon: <Icon icon="mdi:file-document-outline" />,
                description: "เอกสารต่างๆ ของชมรม",
            },
        ],
    },
    {
        to: "/contact",
        label: "ติดต่อเรา",
        dropdownItems: [
            {
                to: "/messaging",
                icon: <Icon icon="mdi:message-text" />,
                label: "ช่องแสดงความเห็น",
                description: "ช่องแสดงความเห็น และวิจารรณ์",
            },
            {
                to: "https://tech.nisit.ku.ac.th",
                icon: <Icon icon="mdi:web" />,
                label: "Website",
                description: "tech.nisit.ku.ac.th",
            },
            {
                to: "mailto:ku.t3ch@gmail.com",
                icon: <Icon icon="tabler:mail" />,
                label: "Email",
                description: "ku.t3ch@gmail.com",
            },
            {
                to: "https://www.facebook.com/ku.t3ch",
                icon: <Icon icon="ic:baseline-facebook" />,
                label: "Facebook",
                description: "KU Tech",
                newTab: true,
            },
            {
                to: "https://www.instagram.com/ku.t3ch/",
                icon: <Icon icon="mdi:instagram" />,
                label: "Instagram",
                description: "ku.t3ch",
                newTab: true,
            },
        ],
    },
];

const NavbarComponent: NextPage<{}> = () => {
    const { push, pathname } = useRouter();
    const { data: session, status } = useSession();

    return (
        <Navbar isBordered variant="sticky" className="bg-transparent">
            <Navbar.Brand onClick={() => push("/")} className="cursor-pointer">
                <Navbar.Toggle showIn={"sm"} aria-label="toggle navigation" />
                <Text hideIn={"sm"}>
                    <Image src={LogoIcon} alt="ku tech logo" width={50} />
                </Text>
                <Text b size={"$2xl"} className="ml-3 " color="inherit">
                    KU Tech
                </Text>
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="sm" variant="default">
                {navbarItems?.map((v, idx) => {
                    // require isMember
                    if (v.onlyMember && !session?.user.isMember) return null!;

                    // require not registered
                    if (v.onlyNotRegistered && session?.user.isMember) return null!;

                    if (!v.dropdownItems) {
                        return (
                            <Navbar.Link key={idx} href={v.to.toString()} isActive={v.to === pathname}>
                                {v.label}
                            </Navbar.Link>
                        );
                    } else {
                        return (
                            <Navbar.Item key={idx}>
                                <Dropdown>
                                    <Dropdown.Button
                                        css={{
                                            px: 0,
                                        }}
                                        auto
                                        light
                                        ripple={false}
                                    >
                                        {v.label}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        containerCss={{
                                            border: "0.25px solid #2E3941",
                                        }}
                                        css={{
                                            $$dropdownMenuWidth: "300px",
                                            $$dropdownItemHeight: "50px",
                                            "& .nextui-dropdown-item": {
                                                py: "$4",
                                                color: "#fff",
                                                // dropdown item left icon
                                                svg: {
                                                    color: "#3694FF",
                                                    mr: "$4",
                                                    fontSize: "$2xl",
                                                },
                                                // dropdown item title
                                                "& .nextui-dropdown-item-content": {
                                                    w: "100%",
                                                    fontSize: "$sm",
                                                    fontWeight: "$bold",
                                                },
                                            },
                                        }}
                                    >
                                        {(v?.dropdownItems ?? []).map((dropdown, idx) => {
                                            // require isMember
                                            if (dropdown.onlyMember && !session?.user.isMember) return null!;

                                            // require not registered
                                            if (v.onlyNotRegistered && session?.user.isMember) return null!;

                                            return (
                                                <Dropdown.Item
                                                    key={idx}
                                                    showFullDescription
                                                    description={dropdown.description}
                                                    icon={dropdown.icon}
                                                >
                                                    <div
                                                        className="absolute top-0 left-0 h-full w-full"
                                                        onClick={() =>
                                                            dropdown.newTab
                                                                ? window.open(dropdown.to, "_blank")
                                                                : push(dropdown.to)
                                                        }
                                                    />
                                                    {dropdown.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Navbar.Item>
                        );
                    }
                })}
            </Navbar.Content>
            <Navbar.Collapse>
                {navbarItems?.map((v, idx) => {
                    // require isMember
                    if (v.onlyMember && !session?.user.isMember) return null!;

                    // require not registered
                    if (v.onlyNotRegistered && session?.user.isMember) return null!;

                    if (!v.dropdownItems) {
                        return (
                            <Navbar.CollapseItem key={idx} isActive={v.to === pathname}>
                                <Link
                                    href={v.to.toString()}
                                    css={{
                                        color: "$white",
                                        fontSize: "$lg",
                                        fontWeight: "$normal",
                                    }}
                                >
                                    {v.label}
                                </Link>
                            </Navbar.CollapseItem>
                        );
                    } else {
                        return (
                            <Navbar.CollapseItem key={idx}>
                                <Dropdown>
                                    <Dropdown.Button
                                        css={{
                                            px: 0,
                                            fontSize: "$lg",
                                        }}
                                        auto
                                        light
                                        ripple={false}
                                    >
                                        {v.label}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        containerCss={{
                                            border: "0.25px solid #2E3941",
                                        }}
                                        css={{
                                            $$dropdownMenuWidth: "300px",
                                            $$dropdownItemHeight: "50px",
                                            "& .nextui-dropdown-item": {
                                                py: "$4",
                                                color: "#fff",
                                                // dropdown item left icon
                                                svg: {
                                                    color: "#3694FF",
                                                    mr: "$4",
                                                    fontSize: "$2xl",
                                                },
                                                // dropdown item title
                                                "& .nextui-dropdown-item-content": {
                                                    w: "100%",
                                                    fontSize: "$sm",
                                                    fontWeight: "$bold",
                                                },
                                            },
                                        }}
                                    >
                                        {(v?.dropdownItems ?? []).map((dropdown, idx) => {
                                            // require isMember
                                            if (dropdown.onlyMember && !session?.user.isMember) return null!;

                                            // require not registered
                                            if (v.onlyNotRegistered && session?.user.isMember) return null!;

                                            return (
                                                <Dropdown.Item
                                                    key={idx}
                                                    showFullDescription
                                                    description={dropdown.description}
                                                    icon={dropdown.icon}
                                                >
                                                    <div
                                                        className="absolute top-0 left-0 h-full w-full"
                                                        onClick={() =>
                                                            dropdown.newTab
                                                                ? window.open(dropdown.to, "_blank")
                                                                : push(dropdown.to)
                                                        }
                                                    />
                                                    {dropdown.label}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Navbar.CollapseItem>
                        );
                    }
                })}
            </Navbar.Collapse>
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
                                                ? session.user.customProfileImage
                                                : session.user.picture
                                        }
                                    />
                                </Dropdown.Trigger>
                            </Navbar.Item>
                            <Dropdown.Menu
                                aria-label="User menu actions"
                                color="secondary"
                                disabledKeys={["profile"]}
                                containerCss={{
                                    border: "0.25px solid #2E3941",
                                }}
                            >
                                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                    <Text b color="gray" css={{ d: "flex" }}>
                                        Signed in as
                                    </Text>
                                    <Text b color="gray" css={{ d: "flex" }}>
                                        {session.user.email}
                                    </Text>
                                </Dropdown.Item>

                                {session?.user.isCoreTeam ? (
                                    <Dropdown.Item key="core" withDivider color="primary">
                                        <div onClick={() => push("/core")}>โพรไฟล์</div>
                                    </Dropdown.Item>
                                ) : (
                                    null!
                                )}

                                <Dropdown.Item key="logout" withDivider color="error">
                                    <div onClick={() => signOut()} className="font-bold">
                                        ล็อกเอาท์
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ) : (
                    <a
                        href={`/sign-in?callbackUrl=/`}
                        className="flex cursor-pointer items-center gap-1 rounded-lg p-3 text-white duration-200 hover:bg-white/5"
                    >
                        <Icon className="text-2xl" icon="material-symbols:last-page-rounded" />
                        <div>เข้าสู่ระบบ</div>
                    </a>
                )}
            </Navbar.Content>
        </Navbar>
    );
};

export default NavbarComponent;
