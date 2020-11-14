import React, { useState } from "react";
import { Menu, Layout } from "antd";
import NewRequestModal from "../NewRequest/NewRequestModal";
import { FileAddOutlined } from "@ant-design/icons";
export default function LeftSider(props) {
  const [showNewRequest, setShowNewRequest] = useState(false);
  return (
    <Layout.Sider>
      <Menu style={{ height: "86vh" }}>
        <Menu.Item className="leftsider_leftsider_new_request_react_tour_step" onClick={() => setShowNewRequest(true)} key={1} icon={<FileAddOutlined />}>
          New Request
        </Menu.Item>
      </Menu>
      {showNewRequest && <NewRequestModal show={showNewRequest} setShow={setShowNewRequest} />}
    </Layout.Sider>
  );
}
