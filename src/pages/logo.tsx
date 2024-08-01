import { Button, CSS, Card, Row, Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const Logo: NextPage<Props> = () => {
  const onDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const CardStyle = { height: "100%", borderWidth: 0 } as CSS;

  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          ตราสัญลักษณ์
        </Text>
        <Card.Divider />
        <div className="flex flex-col  gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download PNG
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <Card css={CardStyle}>
              <Card.Header>
                <Text b>KU Tech Black (png)</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <img src="/logo/KUTechBlack.png" alt="" />
                <Button onClick={() => onDownload("/logo/KUTechBlack.png")} size="sm">
                  ดาวน์โหลด .png
                </Button>
              </Card.Body>
            </Card>
            <Card css={CardStyle}>
              <Card.Header>
                <Text b>KU Tech White (png)</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10"}}>
                <img src="/logo/KUTechWhite.png" alt="" />
                <Button onClick={() => onDownload("/logo/KUTechWhite.png")} size="sm">
                  ดาวน์โหลด .png
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card.Divider />
        <div className="flex flex-col  gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download SVG
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <Card css={CardStyle}>
              <Card.Header>
                <Text b>KU Tech Black (svg)</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <img src="/logo/KUTechBlack.svg" alt="" />
                <Button onClick={() => onDownload("/logo/KUTechBlack.svg")} size="sm">
                  ดาวน์โหลด .svg
                </Button>
              </Card.Body>
            </Card>
            <Card css={CardStyle}>
              <Card.Header>
                <Text b>KU Tech White (svg)</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <img src="/logo/KUTechWhite.svg" alt="" />
                <Button onClick={() => onDownload("/logo/KUTechWhite.svg")} size="sm">
                  ดาวน์โหลด .svg
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
        <Card.Divider />
        <div className="flex flex-col  gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download Ai
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <Card css={CardStyle}>
              <Card.Header>
                <Text b>KU Tech Black (Ai)</Text>
              </Card.Header>
              <Card.Divider />
              <Card.Body css={{ py: "$10" }}>
                <img src="/logo/KUTechBlack.svg" alt="" />
                <Button onClick={() => onDownload("/logo/KUTech.ai")} size="sm">
                  ดาวน์โหลด .ai
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
