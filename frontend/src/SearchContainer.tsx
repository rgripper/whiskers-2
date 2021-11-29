import { SearchResults } from "./SearchResults";
import { SearchOutlined } from "@ant-design/icons";
import { Alert, Input, Layout, Typography } from "antd";
import { useMemo, useState } from "react";
import { useCompanies } from "./useCompanies";
import debounce from "lodash/debounce";

const { Header, Content } = Layout;
export function SearchContainer() {
  const minLength = 3;
  const [search, setSearch] = useState("");
  const { data: companies, error } = useCompanies({ search, minLength });

  const setSearchDebounced = useMemo(() => debounce(setSearch), []);

  if (error instanceof Error) {
    return <Alert type="error">{error.message}</Alert>;
  } else if (error) {
    throw error;
  }

  return (
    <Layout>
      <Header style={{ padding: "0 24px" }}>
        <Input
          size="large"
          placeholder="Type company name..."
          onChange={(event) => setSearchDebounced(event.currentTarget.value)}
          prefix={<SearchOutlined style={{ color: "#c4c4c4" }} />}
        />
      </Header>
      <Content style={{ padding: 24, minHeight: "100vh" }}>
        {search.length < minLength && <Typography.Text type="secondary">Type at least 3 characters.</Typography.Text>}
        {companies &&
          (companies.length === 0 ? (
            <Typography.Text type="secondary">Nothing found.</Typography.Text>
          ) : (
            <SearchResults companies={companies} />
          ))}
      </Content>
    </Layout>
  );
}
