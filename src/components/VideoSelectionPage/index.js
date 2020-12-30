import React from "react";
import { Card, Col, Row  } from "antd";
import socLogo from "../../soc-logo.png";
import {Link} from "react-router-dom";

export default function VideoSelectionPage() {
return <div>
<Row gutter={5}>
<Col span={8}>
<Link to="/viewer/1">
  <Card title="Video title" bordered={false} className="video-card">
    <img src={socLogo} alt="Video Thumbnail" className="video-thumbnail" /><br />
    Video Description
  </Card>
  </Link>
</Col>
<Col span={8}>
  <Card title="Video title" bordered={false}>
    Video Description
  </Card>
</Col>
<Col span={8}>
  <Card title="Video title" bordered={false}>
    Video Description
  </Card>
</Col>
</Row>
</div>
}
