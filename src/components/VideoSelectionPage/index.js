import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Spin, Space, Select } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";
import FilterBox from "../FilterBox";
import "./style.css";
import config from "../../config";

const { Option } = Select;

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const { searchUrl } = useContext(SearchContext);
  const [lecturerData, setLecturerData] = useState();
  const [weekData, setWeekData] = useState();
  const [tagData, setTagData] = useState();

  useEffect(() => {
    async function getSearchData() {
      const response = await fetch(config.BACKEND_URL_SEARCH + searchUrl);
      const data = await response.json();
      setVideoData(data);
    }
    getSearchData();
  }, [searchUrl]);

  //get lecturer data and create options
  useEffect(() => {
    const getLecturerData = async () => {
      const res = await fetch(config.BACKEND_URL_FILTERS_GET_LECTURER);
      const data = await res.json();
      const options = data.map((lecturer) => (
        <Option key={lecturer}>{lecturer}</Option>
      ));
      options.unshift(<Option key={"All Lecturers"}>{"All Lecturers"}</Option>);
      setLecturerData(options);
    };
    if (videoData) {
      getLecturerData();
    }
  }, [videoData]);

  //get week data and creation options
  useEffect(() => {
    const getWeekData = async () => {
      const res = await fetch(config.BACKEND_URL_FILTERS_GET_WEEK);
      const data = await res.json();
      const options = data.map((week) => (
        <Option key={week}>{`Week ${week}`}</Option>
      ));
      // options.sort((a, b) => a.key - b.key);
      options.unshift(<Option key={"All Weeks"}>{"All Weeks"}</Option>);
      setWeekData(options);
    };
    if (videoData) {
      getWeekData();
    }
  }, [videoData]);

  //get tag data and create checkabletags
  useEffect(() => {
    const getTagData = async () => {
      const res = await fetch(config.BACKEND_URL_FILTERS_GET_TAGS);
      const data = await res.json();
      setTagData(data);
    };
    if (videoData) {
      getTagData();
    }
  }, [videoData]);

  if (!videoData) {
    return (
      <>
        <p>no video data</p>
        <Spin />
      </>
    );
  } else
    return (
      <>
        <div id="video-selection-wrapper">
          <FilterBox
            lecturerData={lecturerData}
            weekData={weekData}
            tagData={tagData}
          />
          <div id="video-selection-box">
            <Row>
              <Space wrap size="middle">
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
              </Space>
            </div>
          </div>
        </Row>
      </>
    );
}
