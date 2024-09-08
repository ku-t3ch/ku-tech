import { Button, CSS, Card, Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

interface LogoCardProps {
  title: string;
  imgSrc: string;
  downloadUrl: string;
  fileType: string;
}

const LogoCard: React.FC<LogoCardProps> = ({ title, imgSrc, downloadUrl, fileType }) => {
  const onDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop() || "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card css={{ height: "100%", borderWidth: 0 }}>
      <Card.Header>
        <Text b>{title}</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$10" }}>
        <img src={imgSrc} alt={title} style={{ display: "block", margin: "auto", width: "200px" }} />
        <Button onClick={() => onDownload(downloadUrl)} size="sm">
          ดาวน์โหลด {fileType}
        </Button>
      </Card.Body>
    </Card>
  );
};

const Logo: NextPage<Props> = () => {
  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          ตราสัญลักษณ์
        </Text>
        <Card.Divider />

        {/* Section: Download PNG */}
        <div className="flex flex-col gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download PNG
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <LogoCard
              title="KU Tech Black (png)"
              imgSrc="/logo/KUTechBlack.png"
              downloadUrl="/logo/KUTechBlack.png"
              fileType=".png"
            />
            <LogoCard
              title="KU Tech White (png)"
              imgSrc="/logo/KUTechWhite.png"
              downloadUrl="/logo/KUTechWhite.png"
              fileType=".png"
            />
          </div>
        </div>

        <Card.Divider />

        {/* Section: Download SVG */}
        <div className="flex flex-col gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download SVG
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <LogoCard
              title="KU Tech Black (svg)"
              imgSrc="/logo/KUTechBlack.svg"
              downloadUrl="/logo/KUTechBlack.svg"
              fileType=".svg"
            />
            <LogoCard
              title="KU Tech White (svg)"
              imgSrc="/logo/KUTechWhite.svg"
              downloadUrl="/logo/KUTechWhite.svg"
              fileType=".svg"
            />
          </div>
        </div>

        <Card.Divider />

        {/* Section: Download Ai */}
        <div className="flex flex-col gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download Ai
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            <LogoCard
              title="KU Tech Black (Ai)"
              imgSrc="/logo/KUTechBlack.svg"
              downloadUrl="/logo/KUTech.ai"
              fileType=".ai"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
