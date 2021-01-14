import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Spin, Space, Select } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";
import FilterBox from "../FilterBox";
import "./style.css";
import config from "../../config";
import moment from "moment";

const { Option } = Select;
const { CheckableTag } = Tag;

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const { searchUrl } = useContext(SearchContext);
  const [lecturerData, setLecturerData] = useState();
  const [weekData, setWeekData] = useState();
  const [tagData, setTagData] = useState();
  const { tagState, handleTagChange } = useContext(SearchContext);

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
        <p>Loading...</p>
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
                      <Card
                        style={{
                          width: 250,
                          minHeight: 280,
                        }}
                        bodyStyle={{ padding: "3px 3px" }}
                        bordered={false}
                        className="video-card"
                        cover={
                          <Link to={`/videoviewer/${data.id}`}>
                            <img
                              alt="placeholder"
                              src={data.thumbnail_url}
                              style={{ width: 250, border: "1px solid #ccc" }}
                            />
                          </Link>
                        }
                      >
                        <h3 style={{ marginBottom: 9 }}>
                          {`Week ${data.bootcamp_week}`}: {data.title}
                        </h3>
                        <p style={{ marginBottom: 2 }}>
                          {data.lecturer} on{" "}
                          {moment(data.lecture_date).format("DD MMM YYYY")}
                        </p>
                        <div className="card-tag-container">
                          {data.tags.map((tag) => (
                            <CheckableTag
                              key={tag}
                              checked={tagState.selectedTags.indexOf(tag) > -1}
                              onChange={(checked) => {
                                handleTagChange(tag, checked);
                              }}
                              style={{
                                margin: "0px",
                                padding: "0px 3px",
                                border: "none",
                                fontSize: "13px",
                                color:
                                  tagState.selectedTags.indexOf(tag) > -1
                                    ? "#fff"
                                    : "#40a9ff",
                              }}
                            >
                              {`#${tag}`}
                            </CheckableTag>
                          ))}
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Space>
            </Row>
          </div>
        </div>
      </>
    );
}
//<Tag key={tag}>{tag}</Tag>
