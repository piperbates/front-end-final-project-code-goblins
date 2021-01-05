import React, { useContext } from "react";
import { Card, Col, Row, Tag } from "antd";
import placeholder from "../../images/placeholder.png";
import { Link } from "react-router-dom";

export default function VideoSelectionPage({ allVideoData }) {
  console.log(allVideoData);

  if (!allVideoData) {
    return <p>loading...</p>;
  } else
    return (
      <>
        <Row gutter={15}>
          {allVideoData.map((data) => {
            return (
              <Col key={data.id}>
                <Link to={`/videoviewer/${data.id}`}>
                  <Card
                    hoverable
                    style={{ width: 200, height: 320 }}
                    bordered={true}
                    className="video-card"
                    title={data.title}
                    cover={<img alt="placeholder" src={data.thumbnail_url} />}
                  >
                    <p>Lecturer: {data.lecturer}</p>
                    {data.tags.map((tag) => (
                      <Tag>{tag}</Tag>
                    ))}
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </>
    );
}
