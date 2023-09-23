import { FC } from "react";
import { Bag } from "./Bag";

import tw from "tailwind-styled-components";

interface Balanch {
  name: string | null;
  amount: number;
}

interface Props {
  data: Balanch[];
}

const ICONS = ["bx:money-withdraw", "solar:hand-money-outline", "uil:money-withdrawal"];

const Balanch: FC<Props> = ({ data }) => {
  return (
    <Grid>
      {data.map((val, idx) => {
        return (
          <Bag
            key={idx}
            icon={ICONS[idx] ?? "fluent-mdl2:unknown"}
            title={val?.name || `ไม่ระบุ (${idx + 1})`}
            amount={val.amount}
          />
        );
      })}
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
