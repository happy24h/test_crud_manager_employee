import { useState } from "react";
import {
  Modal,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { callCreateEmployee } from "../config/api";
const { Option } = Select;
const AddEmployee = (props) => {
  const [form] = Form.useForm();

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      const res = await callCreateEmployee(values);
      if (res.status === 201) {
        // eslint-disable-next-line react/prop-types
        props.handleFetchEmployee();
        setIsModalOpen(false);
        form.resetFields();
        message.success("create a employees success!");
      }
      // else {
      //   message.error("create a employee failed!");
      // }
    } catch (error) {
      if (error.response.data?.message.length > 0) {
        message.error(error.response.data.message[0]);
      }
    }
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Employee
      </Button>
      <Modal
        title="Create a employee"
        open={isModalOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập tên" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="date_of_bird"
                label="Date of Bird"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày sinh",
                  },
                ]}>
                <DatePicker
                  style={{ width: "100%" }}
                  defaultValue={undefined}
                  format={dateFormatList}
                  placeholder="Vui lòng chọn ngày sinh"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giới tính",
                  },
                ]}>
                <Select placeholder="Vui lòng chọn giới tính">
                  <Option value="Male">Nam</Option>
                  <Option value="Female">Nữ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}>
                <Input placeholder="Vui lòng nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default AddEmployee;
