import { Info } from "@/interfaces/NewsInterface";
import { css } from "@emotion/css";
import { Card, Col, Row, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  info: Info;
}

const CardNews: NextPage<Props> = ({ info }) => {
  const { push } = useRouter();
  return (
    <a href={`/news/${info.id}`}>
      <Card
        className={css`
          height: 100% !important;
          border-width: 0rem;
        `}
      >
        <Card.Body css={{ p: 0 }}>
          <div className="h-[20rem]" style={{ position: "relative" }}>
            <Image
              src={info.cover.url}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{info.title}</Text>
            <Text
              css={{
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
              }}
            >
              {new Date(info.createdAt).toLocaleString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </a>
  );
};

export default CardNews;
