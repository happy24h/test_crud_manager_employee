import { Form, Input, Row, Col, Button } from "antd";

function EmployeeSearch(props) {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    let query = "";
    if (values.name) {
      query += `&name=${values.name}`;
    }
    if (values.email) {
      query += `&email=${values.email}`;
    }
    if (values.name || values.email) {
      // eslint-disable-next-line react/prop-types
      props.handleSearch(query);
    } else {
      // eslint-disable-next-line react/prop-types
      props.handleSearch("");
    }
  };

  const resetForm = async () => {
    await form.resetFields();
    await form.submit();
  };


  return (
    <Form form={form} onFinish={onFinish}>
      <Row
        gutter={24}
        style={{
          background: "#fff",
          paddingTop: 25,
          margin: 0,
          marginBottom: 20,
          borderRadius: 6,
        }}>
        <Col span={8}>
          <Form.Item name="name" label="Name">
            <Input placeholder="Tìm kiếm tên nhân viên..." />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Tìm kiếm địa chỉ nhân viên..." />
          </Form.Item>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
            style={{ marginRight: 12 }}>
            Tìm kiếm
          </Button>
          <Button type="primary" danger onClick={resetForm}>
            Làm lại
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default EmployeeSearch;
