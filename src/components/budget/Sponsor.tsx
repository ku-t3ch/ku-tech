import { FC } from "react";
import { Tooltip } from "antd";

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
              <Brand.Image src={v.brand_logo} />
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
`;

const Brand = {
  List: tw.div`
    py-[2.5rem]
    flex
    flex-wrap
    gap-5
    justify-center
  `,
  Image: tw.img`
    rounded-full
    h-[5rem]
    w-[5rem]
  `,
};

export default Sponsor;
