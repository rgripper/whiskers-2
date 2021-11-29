import { Space, Spin, Tag, Typography } from "antd";
import { Company } from "./useCompanies";

export function SearchResults({ companies }: { companies: Company[] }) {
  return (
    <Space direction="vertical" size="large" data-testid="search-results">
      {companies.map((company) => (
        <Space direction="horizontal" size="middle">
          <img alt="logo" src="http://placekitten.com/g/116/116" />
          <div>
            <Typography.Title level={4} data-testid="company-name">
              {company.name}
            </Typography.Title>
            <Space direction="vertical" size="small">
              <div>{company.city}</div>
              <div>
                {company.services.map((service) => (
                  <Tag color="blue">{service}</Tag>
                ))}
              </div>
            </Space>
          </div>
        </Space>
      ))}
    </Space>
  );
}
