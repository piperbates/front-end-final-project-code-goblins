import React from "react";
import { Menu } from "antd";
import { UserOutlined, TagOutlined } from "@ant-design/icons";

const CmsMenu = ({ toggleTagDisplay, toggleVisible }) => {
  return (
    <Menu style={{ userSelect: "none", textAlign: "center" }}>
      <Menu.Item
        key="1"
        icon={<TagOutlined />}
        onClick={() => {
          toggleVisible();
          toggleTagDisplay();
        }}
      >
        Tag Editor
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Lecturer Editor
      </Menu.Item>
    </Menu>
  );
};

export default CmsMenu;
