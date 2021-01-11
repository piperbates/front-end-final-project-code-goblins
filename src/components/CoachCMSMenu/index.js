import React from "react";
import { Menu } from "antd";
import { UserOutlined, TagOutlined } from "@ant-design/icons";

const CmsMenu = ({ toggleTagDisplay }) => {
  return (
    <Menu style={{ userSelect: "none" }}>
      <Menu.Item key="1" icon={<TagOutlined />} onClick={toggleTagDisplay}>
        Tag Editor
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Lecturer Editor
      </Menu.Item>
    </Menu>
  );
};

export default CmsMenu;
