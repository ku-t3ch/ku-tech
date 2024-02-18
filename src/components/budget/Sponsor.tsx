import { FC } from "react";
import { Tooltip } from "antd";
import { Avatar } from "@nextui-org/react";

import tw from "tailwind-styled-components";

interface Sponsor {
  brand_name: string;
  brand_logo: string;
}

interface Props {
  data?: Sponsor[];
}

const Sponsor: FC<Props> = ({ data = [] }) => {
  return (
    <Container>
      <Title>ผู้สนับสนุน</Title>
      <Brand.List>
        {data.map((v, idx) => {
          return (
            <Tooltip key={`brand-logo-${idx}`} title={v.brand_name}>
              <Avatar
                src={v.brand_logo}
                color="gradient"
                bordered
                css={{
                  height: "5rem",
                  width: "5rem",
                }}
              />
            </Tooltip>
          );
        })}
      </Brand.List>
    </Container>
  );
};

const Container = tw.div`
  py-[5rem]
`;

const Title = tw.div`
  font-bold
  text-[1.8rem]
  text-center
  mb-[2rem]
`;

const Brand = {
  List: tw.div`
    flex
    flex-wrap
    gap-5
    justify-center
  `,
};

export default Sponsor;
