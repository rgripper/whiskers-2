import { Col, Row } from "antd";
import { SearchContainer } from "./SearchContainer";

function App() {
  return (
    <Row justify="center">
      <Col span={24} xs={24} md={12} lg={8}>
        <SearchContainer />
      </Col>
    </Row>
  );
}

export default App;
