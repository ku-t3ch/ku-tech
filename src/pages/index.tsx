import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, Navbar, Text } from "@nextui-org/react";
import BIRDS from "vanta/dist/vanta.birds.min";
import { useEffect, useRef, useState } from "react";
// import { api } from "@/utils/api";

const Home: NextPage = () => {
  //   const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Navbar isBordered variant={"sticky"}>
        <Navbar.Brand>
          <Text b color="inherit">
            KU Tech
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="sm">
          <Navbar.Link href="#">เกี่ยวกับชมรม</Navbar.Link>
          <Navbar.Link href="#">กำหนดการ</Navbar.Link>
          <Navbar.Link href="#">ผู้สนับสนุน</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              เข้าร่วมชมรม
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
      {/* <div className="h-screen w-full" ref={vanta}></div> */}
    </>
  );
};

export default Home;
