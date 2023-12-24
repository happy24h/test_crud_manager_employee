import React from "react";
import {
  UserOutlined,
  PlusCircleOutlined,
  EditOutlined,
  BugOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const items = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: `Manager Employee`,
  },
  {
    key: "2",
    icon: <PlusCircleOutlined />,
    label: `Add Employee`,
  },
  {
    key: "3",
    icon: <EditOutlined />,
    label: `Edit Employee`,
  },
];
function Sidebar() {
  return (
    <>
      {" "}
      <Sider
        theme="light"
        collapsible
        style={{ borderRight: "1px solid #f2f2f2" }}>
        <div
          style={{
            height: 32,
            margin: "16px 16px 36px 16px",
            lineHeight: "32px",
            textAlign: "center",
          }}>
          <BugOutlined /> ADMIN
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
    </>
  );
}

export default Sidebar;
