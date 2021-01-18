import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Row, Tag, Spin, Select, Pagination, Layout } from "antd";
import { Link } from "react-router-dom";
import { SearchContext } from "../../contexts/searchContext";
import FilterBox from "../FilterBox";
import config from "../../config";
import moment from "moment";

const { Option } = Select;
const { CheckableTag } = Tag;
const { Sider, Content } = Layout;

export default function VideoSelectionPage({ allVideoData }) {
  const [videoData, setVideoData] = useState(allVideoData);
  const { searchUrl } = useContext(SearchContext);
  const [lecturerData, setLecturerData] = useState();
  const [weekData, setWeekData] = useState();
  const [tagData, setTagData] = useState();
  const { tagState, handleTagChange, paging, setPaging } = useContext(
    SearchContext
  );

  const [total, setTotal] = useState(0);

  //pagination page count + population for pages
  useEffect(() => {
    const getPaginationData = async () => {
      console.log("pagination fire");
      const countRes = await fetch(config.BACKEND_URL_SEARCH_VIDEO_COUNT);
      const countData = await countRes.json();
      setTotal(countData[0].count);

      const pagRes = await fetch(
        config.BACKEND_URL_SEARCH_PAGINATION +
          `position=${paging.position}&paging=${paging.paging}`
      );
      const pagData = await pagRes.json();
      setVideoData(pagData);
    };
    if (!searchUrl) {
      getPaginationData();
    }
  }, [paging]);

  //search for text, tags, weeks, lecturers
  useEffect(() => {
    async function getSearchData() {
      const response = await fetch(config.BACKEND_URL_SEARCH + searchUrl);
      const data = await response.json();
      setVideoData(data);
    }
    if (searchUrl) {
      getSearchData();
    }
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
      <Row justify="center">
        <Col span={23}>
          <Layout>
            <Sider width={266} theme="light">
              <FilterBox
                lecturerData={lecturerData}
                weekData={weekData}
                tagData={tagData}
              />
            </Sider>

            <Content style={{ backgroundColor: "#fff" }}>
              {!!!searchUrl && (
                <Pagination
                  onChange={(page, pageSize) => {
                    setPaging({ position: page, paging: pageSize });
                  }}
                  total={total}
                  current={paging.position}
                  pageSize={paging.paging}
                  defaultCurrent={1}
                  defaultPageSize={15}
                  responsive={true}
                  pageSizeOptions={[15, 20, 25]}
                  style={{ marginBottom: "8px" }}
                  showSizeChanger
                />
              )}
              <ul
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  position: "relative",
                  padding: "0",
                  listStyle: "none",
                }}
              >
                {videoData.map((data) => {
                  return (
                    <li
                      key={data.id}
                      style={{
                        padding: "0",
                        listStyle: "none",
                        minWidth: "150px",
                        maxWidth: "600px",
                        marginRight: "1.5em",
                        marginBottom: "3em",
                      }}
                    >
                      <Card
                        bodyStyle={{ padding: "3px 3px" }}
                        bordered={false}
                        cover={
                          <Link to={`/videoviewer/${data.id}`}>
                            <img
                              alt="placeholder"
                              src={data.thumbnail_url}
                              style={{
                                width: "100%",
                                margin: "0px",
                                padding: "0px",
                              }}
                            />
                          </Link>
                        }
                      >
                        <h3 style={{ marginBottom: 0 }}>
                          {`Week ${data.bootcamp_week}`}: {data.title}
                        </h3>
                        <p style={{ marginBottom: 10 }}>
                          {data.lecturer} on{" "}
                          {moment(data.lecture_date).format("DD MMM YYYY")}
                        </p>

                        {data.tags.map((tag) => (
                          <CheckableTag
                            key={tag}
                            checked={tagState.selectedTags.indexOf(tag) > -1}
                            onChange={(checked) => {
                              handleTagChange(tag, checked);
                            }}
                            style={{
                              userSelect: "none",
                              margin: "0px",
                              padding: "0px 3px",
                              border: "none",
                              fontSize: "1em",
                              color:
                                tagState.selectedTags.indexOf(tag) > -1
                                  ? "#fff"
                                  : "#40a9ff",
                            }}
                          >
                            {`#${tag}`}
                          </CheckableTag>
                        ))}
                      </Card>
                    </li>
                  );
                })}
              </ul>
            </Content>
          </Layout>
        </Col>
      </Row>
    );
}
//<Tag key={tag}>{tag}</Tag>
