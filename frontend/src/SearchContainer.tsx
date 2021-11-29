import { SearchResults } from "./SearchResults";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Col, Input, Layout, Row, Space, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useCompanies } from "./useCompanies";
import debounce from "lodash/debounce";

const { Header, Content } = Layout;

const services = ["plumbing", "electrical", "demolition", "excavation", "sewage"];

export function SearchContainer() {
  const searchMinLength = 3;
  const [search, setSearch] = useState("");

  const [selectedServices, selectServices] = useState<string[]>(services);
  const { data: companies, error } = useCompanies({ search, searchMinLength, services: selectedServices });

  const setSearchDebounced = useMemo(() => debounce(setSearch, 250), []);

  if (error instanceof Error) {
    return <Alert type="error">{error.message}</Alert>;
  } else if (error) {
    throw error;
  }

  useEffect(() => {
    if (selectedServices.length === 0) {
      selectServices(services);
    }
  }, [selectedServices]);

  return (
    <Layout>
      <Content style={{ padding: "24px", height: "auto", background: "#ffd666" }}>
        <Space direction="vertical" size="middle">
          <Input
            size="large"
            placeholder="Type company name..."
            onChange={(event) => setSearchDebounced(event.currentTarget.value)}
            prefix={<SearchOutlined style={{ color: "#c4c4c4" }} />}
          />
          <Checkbox.Group value={selectedServices} onChange={(values) => selectServices(values as string[])}>
            <Row gutter={20}>
              {services.map((service) => (
                <Col key={service} span={8}>
                  <Checkbox value={service} style={{ margin: 4 }}>
                    {service}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Space>
      </Content>
      <Content style={{ padding: 24, minHeight: "100vh" }}>
        {search.length < searchMinLength && (
          <Typography.Text type="secondary">Type at least 3 characters.</Typography.Text>
        )}
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
