import React from "react";
import { Descriptions } from "antd";

const DescriptionBox = ({ width, data }) => {
  return (
    <Descriptions
      title="Video Info"
      size="small"
      column={1}
      style={{ width: width }}
    >
      <Descriptions.Item label="Title">{data.name}</Descriptions.Item>
      <Descriptions.Item label="Created">{data.created_time}</Descriptions.Item>
      <Descriptions.Item label="URL">{data.link}</Descriptions.Item>
      <Descriptions.Item label="Created">{data.created_time}</Descriptions.Item>
    </Descriptions>
  );
};

export default DescriptionBox;
