import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Spin } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const { searchText } = useContext(SearchContext);

  useEffect(() => {
    async function getSearchData() {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + `/?search=${searchText}`
      );
      const data = await response.json();
      setVideoData(data);
    }
    getSearchData();
  }, [searchText]);

  if (!videoData) {
    return <Spin />;
  } else
    return (
      <>
        <Row gutter={15}>
          {videoData.map((data) => {
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
