import React from "react";
import { Button, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import CmsMenu from "../CoachCMSMenu";

const CmsDropdown = ({ toggleTagDisplay }) => {
  return (
    <Dropdown overlay={<CmsMenu toggleTagDisplay={toggleTagDisplay} />}>
      <Button size="middle" type="primary" block>
        <MenuOutlined />
        Tools
      </Button>
    </Dropdown>
  );
};

export default CmsDropdown;
