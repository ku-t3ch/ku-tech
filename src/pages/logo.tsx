import { Button, Card, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Image from 'next/image';
import React, { useState } from 'react';
import { Loading } from "@nextui-org/react";

interface Props {}

interface LogoCardProps {
  title: string;
  imgSrc: string;
  downloadUrl: string;
  fileType: string;
}

const LogoCard = React.memo<LogoCardProps>(({ title, imgSrc, downloadUrl, fileType }) => {
  const [isLoading, setIsLoading] = useState(true);

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
        <div style={{ position: 'relative', width: '200px', height: '200px', margin: 'auto' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <Loading />
            </div>
          )}
          <Image
            src={imgSrc}
            alt={title}
            fill
            style={{ 
              objectFit: 'contain',
              display: isLoading ? 'none' : 'block'
            }}
            priority
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <Button 
          onClick={() => onDownload(downloadUrl)} 
          size="sm"
          css={{ mt: '1rem' }}
        >
          ดาวน์โหลด {fileType}
        </Button>
      </Card.Body>
    </Card>
  );
});

LogoCard.displayName = 'LogoCard';

const Logo: NextPage<Props> = () => {
  const logos = {
    png: [
      {
        title: "KU Tech Black (png)",
        imgSrc: "/logo/KUTechBlack.png",
        downloadUrl: "/logo/KUTechBlack.png",
        fileType: ".png"
      },
      {
        title: "KU Tech White (png)",
        imgSrc: "/logo/KUTechWhite.png",
        downloadUrl: "/logo/KUTechWhite.png",
        fileType: ".png"
      }
    ],
    svg: [
      {
        title: "KU Tech Black (svg)",
        imgSrc: "/logo/KUTechBlack.svg",
        downloadUrl: "/logo/KUTechBlack.svg",
        fileType: ".svg"
      },
      {
        title: "KU Tech White (svg)",
        imgSrc: "/logo/KUTechWhite.svg",
        downloadUrl: "/logo/KUTechWhite.svg",
        fileType: ".svg"
      }
    ],
    ai: [
      {
        title: "KU Tech Black (Ai)",
        imgSrc: "/logo/KUTechBlack.svg",
        downloadUrl: "/logo/KUTech.ai",
        fileType: ".ai"
      }
    ]
  };

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
            {logos.png.map((logo, index) => (
              <LogoCard key={`png-${index}`} {...logo} />
            ))}
          </div>
        </div>

        <Card.Divider />

        {/* Section: Download SVG */}
        <div className="flex flex-col gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download SVG
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {logos.svg.map((logo, index) => (
              <LogoCard key={`svg-${index}`} {...logo} />
            ))}
          </div>
        </div>

        <Card.Divider />

        {/* Section: Download Ai */}
        <div className="flex flex-col gap-5">
          <Text className="prompt" b size={"$xl"}>
            Download Ai
          </Text>
          <div className="grid grid-cols-1 justify-center gap-5 md:grid-cols-2">
            {logos.ai.map((logo, index) => (
              <LogoCard key={`ai-${index}`} {...logo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;