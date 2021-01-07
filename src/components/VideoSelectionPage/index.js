import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import HeaderBar from "../HeaderBar";

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const [searchState, setSearchState] = useState({ search: "" });

  function updateSearch(search) {
    setSearchState({ ...searchState, search: search });
  }

  useEffect(() => {
    if (searchState) {
      async function getSearchData() {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + `/?search=${searchState.search}`
        );
        const data = await response.json();
        setVideoData(data);
      }
      getSearchData();
    } else setVideoData(allVideoData);
  }, [searchState]);

  if (!videoData) {
    return <p>loading...</p>;
  } else
    return (
      <>
        <HeaderBar updateSearch={updateSearch} />
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
