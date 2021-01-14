import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import { SearchContext } from "../../contexts/searchContext";
import config from "../../config";
import FeedbackForm from "../FeedbackForm";
import { Spin, Row, Col, Space, Descriptions, Typography, Divider } from "antd";
import FeedbackViewer from "../FeedbackViewer";
import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
const { Title, Paragraph, Text, Link } = Typography;


export default function LectureViewer() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);

  const id = useLocation().pathname.split("/").pop();
  const player = useRef(null);
  const [videoData, setVideoData] = useState(false);
  const { searchText } = useContext(SearchContext);
  const [previousSearch] = useState(searchText);

  useEffect(() => {
    async function getVideoData() {
      const response = await fetch(config.BACKEND_URL_SEARCH_BY_ID + id);
      const data = await response.json();
      setVideoData(data[0]);
    }
    getVideoData();
  }, [id]);

  if (searchText !== previousSearch) {
    return <Redirect exact to="/" />;
  }

  function seekToTimestamp(seconds) {
    return player.current.seekTo(seconds);
  }
  console.log(videoData);
  if (!videoData) {
    return (
      <>
        <Spin />
      </>
    );
  } else
    return (
      <Row justify={"center"}>
        ​<Col span={24}></Col>
        <Col span={16}>
          <div className="player-wrapper">
            <ReactPlayer
              ref={player}
              url={videoData.video_url}
              controls={true}
              className="react-player"
              width="95%"
              height="95%"
            />
          </div>
          <Col span={21}>
            <h1 style={{ padding: "0px" }}>{videoData.title}</h1>
            <h2 style={{ padding: "0px" }}>{videoData.lecturer}</h2>
            Video ID: {videoData.id}
          </Col>
          <Col span={23}>
            <Descriptions
              colon={false}
              title="Description"
              style={{
                marginTop: "16px",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              <Descriptions.Item>{videoData.description} </Descriptions.Item>
            </Descriptions>
            {adminUsers[0].find((user) => user.email === currentUser.email) ? <FeedbackViewer /> : <></>}
            

          </Col>
        </Col>
        <Col span={5}>
          <Space direction="vertical" size="small">
            <FeedbackForm />
            <h3>Resources</h3>​
            <Paragraph>
              {[
                ...videoData.github_links,
                ...videoData.slides,
                ...videoData.other_links,
              ].map((value) => (
                <div key={value.uuid}>
                  <a
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {value.type} - {value.desc}
                  </a>
                  <br />
                </div>
              ))}
            </Paragraph>
            <Space direction="vertical">
              ​<h3>Timestamps</h3>
              {videoData.timestamps.map((value) => {
                return (
                  <div>
                    <button
                      key={value.uuid}
                      onClick={() => seekToTimestamp(value.timeSecondsValue)}
                    >
                      {`${value.timeString} - ${value.timeDesc}`}
                    </button>
                    <br />
                  </div>
                );
              })}
            </Space>
          </Space>
        </Col>
      </Row>
    );
}
