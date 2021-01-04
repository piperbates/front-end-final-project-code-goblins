import React, { useContext } from "react";
import { Card, Col, Row, Tag } from "antd";
import placeholder from "../../placeholder.png";
import { Link } from "react-router-dom";
import { DataContext } from "../../contexts/dataContext";

export default function VideoSelectionPage() {
  const mockData = useContext(DataContext);

  return (
    <>
      <Row gutter={15}>
        {mockData.map((card) => {
          return (
            <Col>
              <Link to={`/videoviewer/${card.id}`}>
                <Card
                  hoverable
                  style={{ width: 200, height: 320 }}
                  bordered={true}
                  className="video-card"
                  title={card.title}
                  cover={<img alt="placeholder" src={placeholder} />}
                >
                  <p>Lecturer: {card.lecturer}</p>
                  {card.tags.map((tag) => (
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
