import tw from "tailwind-styled-components";

export const Table = {
  Container: tw.div`
    relative
    w-auto
    overflow-auto
    rounded-lg
  `,
  Main: tw.table`
    w-full
    h-full
  `,
};

export const Thead = {
  Main: tw.thead`
    sticky
    top-0
  `,
  Tr: tw.tr`
    bg-[#16181A]
    text-[#777F84]
  `,
  Th: tw.th`
    p-[.85rem]
    text-sm
    font-semibold
    first:rounded-l-xl
    last:rounded-r-xl
  `,
};

export const TBody = {
  Main: tw.tbody``,
  Tr: tw.tr`
    last:border-0
  `,
  Td: tw.td`
    py-[1.2rem]
    px-[.85rem]
    text-center
  `,
};
