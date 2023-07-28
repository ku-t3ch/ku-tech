import { NextPage } from "next";
import { FileIcon } from "react-file-icon";

import tw from "tailwind-styled-components";
import { TBody, Table, Thead } from "./Table";

interface Project {
  name: string | null;
  amount: number | null;
}

interface Props {
  data?: Project[];
}

const ProjectList: NextPage<Props> = ({ data = [] }) => {
  const columns = [
    {
      key: "id",
      label: "ลำดับ",
    },
    {
      key: "project-name",
      label: "ชื่อโครงการ",
      alignLeft: "start",
    },
    {
      key: "amount",
      label: "ได้รับจำนวน",
    },
    {
      key: "description",
      label: "รายละเอียด",
    },
  ];

  return (
    <Table.Container className="max-h-[18rem]">
      <Table.Main>
        <Thead.Main>
          <Thead.Tr>
            {columns.map((v, idx) => {
              return (
                <Thead.Th
                  key={idx}
                  style={{
                    textAlign: v.alignLeft ? "start" : "center",
                  }}
                >
                  {v.label}
                </Thead.Th>
              );
            })}
          </Thead.Tr>
          <tr></tr>
        </Thead.Main>
        <TBody.Main>
          {data.map((v, idx) => {
            return (
              <TBody.Tr key={idx}>
                <TBody.Td className="p-[1rem]">{idx + 1}</TBody.Td>
                <TBody.Td className="text-start">{v.name}</TBody.Td>
                <TBody.Td>{v.amount?.toLocaleString()}</TBody.Td>
                <TBody.Td>
                  <div className="flex justify-center">
                    <div role="button" className="w-[1rem]">
                      <FileIcon type="document" extension="pdf" color="aliceblue" />
                    </div>
                  </div>
                </TBody.Td>
              </TBody.Tr>
            );
          })}
        </TBody.Main>
      </Table.Main>
    </Table.Container>
  );
};

const Title = tw.div`
  py-[.5rem]
  text-center
  text-[1.15rem]
  font-bold
  tracking-wide
`;

export default ProjectList;
