import { Info } from "@/interfaces/NewsInterface";
import { Card, Col, Row, Text } from "@nextui-org/react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  info: Info;
}

const CardNews: NextPage<Props> = ({ info }) => {
  const { push } = useRouter();
  return (
    <a href={`/news/${info.id}`}>
      <Card css={{ w: "100%", h: "400px" }}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={info.cover.url}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col>
                  <Text h3 color="white">
                    {info.title}
                  </Text>
                  <Text color="#d1d1d1" size={12}>
                    {/* {format(new Date(info.publishedAt), "dd MMMM yyyy HH:mm")}  */}
                    {new Date(info.createdAt).toLocaleString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </a>
  );
};

export default CardNews;
