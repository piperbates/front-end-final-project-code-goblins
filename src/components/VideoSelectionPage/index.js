import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Spin } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";
import FilterBox from "../FilterBox";
import "./style.css";
import config from "../../config";

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const { searchUrl } = useContext(SearchContext);

  useEffect(() => {
    async function getSearchData() {
      const response = await fetch(config.BACKEND_URL_SEARCH + searchUrl);
      const data = await response.json();
      setVideoData(data);
    }
    getSearchData();
  }, [searchUrl]);

  if (!videoData) {
    return <Spin />;
  } else
    return (
      <>
        <div id="video-selection-wrapper">
          <FilterBox />
          <div id="video-selection-box">
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
                        cover={
                          <img alt="placeholder" src={data.thumbnail_url} />
                        }
                      >
                        <p>Lecturer: {data.lecturer}</p>
                        {data.tags.map((tag, index) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </>
    );
}
