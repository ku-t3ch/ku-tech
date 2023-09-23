import { FC } from "react";
import { Bag } from "./Bag";

import tw from "tailwind-styled-components";

interface Props {}

const Balanch: FC<Props> = () => {
  return (
    <Grid>
      <Bag icon="bx:money-withdraw" title="งบกิจกรรมนิสิต" amount={7_000_000} />
      <Bag icon="solar:hand-money-outline" title="ได้รับจัดสรร" amount={7_000_000} />
      <Bag icon="uil:money-withdrawal" title="คงเหลือ" amount={7_000_000} />
    </Grid>
  );
};

const Grid = tw.div`
  grid
  grid-cols-1
  gap-3
  md:grid-cols-3
`;

export default Balanch;
