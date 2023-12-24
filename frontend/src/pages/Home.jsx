import { Space, Table, Tag } from "antd";
import { Row, Col, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EmployeeSearch from "../components/EmployeeSearch";
import { useEffect, useState } from "react";
import { callFetchEmployee, callDeleteEmployee } from "../config/api";
import AddEmployee from "./AddEmployee";
import dayjs from "dayjs";
import EditEmployee from "./EditEmployee";
import EmployeeViewDetail from "./EmployeeViewDetail";

function Home() {
  const [searchData, setSearchData] = useState("");
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dataViewDetail, setDataViewDetail] = useState();
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "id",
      render: (text, record) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}>
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
      // className: "no-sort",
    },
    {
      title: "Date of Bird",
      dataIndex: "date_of_bird",
      key: "date_of_bird",
      render: (text) => {
        // Chuyển đổi chuỗi ngày thành đối tượng ngày
        const dateObject = dayjs(text);
        // Định dạng lại theo định dạng 'DD/MM/YYYY'
        const formattedDate = dateObject.format("DD/MM/YYYY");
        return formattedDate;
      },
    },
    {
      title: "Gender",
      key: "gender",
      dataIndex: "gender",
      render: (text) => {
        let color = text.length > 5 ? "volcano" : "geekblue";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ["ascend", "descend"],
      // className: "no-sort",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditEmployee
            id={record._id}
            handleFetchEmployee={handleFetchEmployee}
          />
          <Popconfirm
            placement="leftTop"
            title={"Xác nhận xóa nhân viên"}
            description={"Bạn có chắc chắn muốn xóa nhân viên này ?"}
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Xác nhận"
            cancelText="Hủy">
            <Button type="primary" danger ghost>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDeleteUser = async (id) => {
    console.log("check id delete", id);
    const result = await callDeleteEmployee(id);
    console.log("check result delete", result);
    if (result.status === 200) {
      await handleFetchEmployee();
      message.success("delete success!");
      if (listEmployees?.result.length === 1 && current !== 1) {
        setCurrent((prev) => prev - 1);
      }
    } else {
      message.error("delete failed!");
    }
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Employee</span>

        <AddEmployee handleFetchEmployee={handleFetchEmployee} />
        <EmployeeViewDetail
          openViewDetail={openViewDetail}
          setOpenViewDetail={setOpenViewDetail}
          dataViewDetail={dataViewDetail}
        />
      </div>
    );
  };
  const [listEmployees, setListEmployees] = useState([]);
  let query = `current=${current}&pageSize=${pageSize}${searchData}&sort=-updatedAt`;
  const handleFetchEmployee = async () => {
    setLoading(true);
    const res = await callFetchEmployee(query);
    setListEmployees(res.data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const onChange = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          {/* <UserSearch handleSearch={setSearchData} /> */}
          <EmployeeSearch handleSearch={setSearchData} />
        </Col>
      </Row>
      <Table
        title={renderHeader}
        columns={columns}
        dataSource={listEmployees?.result}
        rowKey={"_id"}
        loading={loading}
        onChange={onChange}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: listEmployees.meta?.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
    </>
  );
}

export default Home;
