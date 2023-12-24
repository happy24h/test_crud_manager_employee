/* eslint-disable react/prop-types */
import { Descriptions, Drawer } from "antd";
import moment from "moment";
import dayjs from "dayjs";

function EmployeeViewDetail(props) {
  let { openViewDetail, setOpenViewDetail, dataViewDetail } = props;
  const onClose = () => {
    setOpenViewDetail(false);
  };
  return (
    <>
      <Drawer
        title="Chức năng xem chi tiết"
        width={"50vw"}
        onClose={onClose}
        open={openViewDetail}>
        <Descriptions title="Thông tin người dùng" bordered column={2}>
          <Descriptions.Item label="ID">
            {dataViewDetail?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Date_of_bird">
            {dayjs(dataViewDetail?.date_of_bird).format("DD/MM/YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {dataViewDetail?.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {dataViewDetail?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {dataViewDetail?.address}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(dataViewDetail?.createdAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {moment(dataViewDetail?.updatedAt).format("DD-MM-YY HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </>
  );
}

export default EmployeeViewDetail;
