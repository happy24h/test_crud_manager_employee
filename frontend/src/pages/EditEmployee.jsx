import { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import { callUpdateEmployee, callFetchEmployeeByID } from "../config/api";
import { EditTwoTone } from "@ant-design/icons";
const { Option } = Select;
const EditEmployee = (props) => {
  const [form] = Form.useForm();
  const [detailEmployee, setDetailEmployee] = useState();

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
      // eslint-disable-next-line react/prop-types
      const res = await callUpdateEmployee(props.id, values);
      if (res.status === 200) {
        // eslint-disable-next-line react/prop-types
        props.handleFetchEmployee();
        setIsModalOpen(false);
        message.success("update a employee success!");
      }
      // else {
      //   message.error("update a employee failed!");
      // }
    } catch (error) {
      if (error.response.data?.message.length > 0) {
        message.error(error.response.data.message[0]);
      }
    }
  };
  const fetchEmployeeById = async () => {
    // eslint-disable-next-line react/prop-types
    const result = await callFetchEmployeeByID(props.id);
    const date_of_bird = dayjs(result.data.date_of_bird); // Chuyển đổi giá trị thành đối tượng ngày
    setDetailEmployee({ ...result.data, date_of_bird });
  };
  useEffect(() => {
    fetchEmployeeById();
    // eslint-disable-next-line react-hooks/exhaustive-deps, react/prop-types
  }, [props.id]);

  useEffect(() => {
    form.setFieldsValue(detailEmployee);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailEmployee]);

  return (
    <>
      <Button
        onClick={showModal}
        style={{ border: "1px solid #f57800" }}
        type="primary"
        ghost>
        <EditTwoTone twoToneColor="#f57800" style={{ cursor: "pointer" }} />
      </Button>
      <Modal
        title="Edit a employee"
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

export default EditEmployee;
