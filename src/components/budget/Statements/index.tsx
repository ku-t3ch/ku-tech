import { api } from "@/utils/api";
import { FC, useEffect, useState } from "react";
import { Collapse } from "@nextui-org/react";
import { Input, Select } from "antd";
import { useMediaQuery } from "usehooks-ts";
import { Icon } from "@iconify/react";

import dynamic from "next/dynamic";
import tw from "tailwind-styled-components";
import LoadingSkeleton from "./LoadingSkeleton";
import EmptyData from "./EmptyData";

const Record = dynamic(() => import("./Record"));

interface Props {
  budgetId: string | null;
}

interface Filter {
  budgetId: string | null;
  searchTerm: string | null;
  orderBy: "desc" | "asc";
}

const Statements: FC<Props> = ({ budgetId }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [filter, setFilter] = useState<Filter>({
    budgetId,
    searchTerm: null,
    orderBy: "desc",
  });
  const [isRequesting, setRequesting] = useState(false);

  const projects = api.budget.getProjects.useQuery(filter);

  const [search, setSearch] = useState<string>("");

  const handleOnFilterChange = (value: "desc" | "asc") => {
    if (isRequesting) return;

    setRequesting(true);
    setTimeout(() => {
      setFilter((p) => ({ ...p, searchTerm: "", orderBy: value }));
      setRequesting(false);
    }, 1000);
  };

  useEffect(() => {
    if (isRequesting || projects.isInitialLoading) return;

    const timeout = setTimeout(() => {
      setRequesting(true);
      setTimeout(() => {
        setFilter((p) => ({ ...p, searchTerm: search }));
        setRequesting(false);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <Container>
      <Search.Container>
        <Input
          size="large"
          placeholder="ค้นหาโครงการ"
          prefix={<Icon icon="ic:round-search" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          size="large"
          defaultValue="desc"
          style={{ width: 120 }}
          onChange={handleOnFilterChange}
          aria-label="project-filther"
        >
          <Select.Option value="desc">ล่าสุด</Select.Option>
          <Select.Option value="asc">เก่าสุด</Select.Option>
        </Select>
      </Search.Container>
      <Collapse.Group
        splitted
        css={{
          padding: 0,
        }}
      >
        {projects.isLoading || isRequesting ? (
          <LoadingSkeleton />
        ) : projects?.data?.length == 0 ? (
          <EmptyData />
        ) : (
          projects?.data?.map((v, idx) => {
            return (
              <Record
                key={`expense-${idx}`}
                title={v.name}
                spendingData={v.spendingUse ?? []}
                receive={v.amount}
                start_date={v.start_date}
                ended_date={v.ended_date}
                isMobile={isMobile}
              />
            );
          })
        )}
      </Collapse.Group>
    </Container>
  );
};

const Container = tw.div`
  pb-[5rem]
`;

const Search = {
  Container: tw.div`
    pb-[2rem]
    max-w-[40rem]
    flex
    gap-2
    mx-auto
  `,
};

export default Statements;
