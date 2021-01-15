import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import { SearchContext } from "../../contexts/searchContext";
import config from "../../config";
import FeedbackForm from "../FeedbackForm";
import {
  GithubOutlined,
  FundProjectionScreenOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Spin, Row, Col, Space, Button, Divider } from "antd";

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

  if (!videoData) {
    return (
      <>
        <Spin />
      </>
    );
  } else
    return (
      <>
        <Row justify="center">
          <Col span={15}>
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
            <Col span={19}>
              <h1 style={{ padding: "0px", marginBottom: "0px" }}>
                {videoData.title}
              </h1>
              <h2 style={{ padding: "0px" }}>{videoData.lecturer}</h2>
              <Space direction="vertical">
                <Divider style={{ width: "300px" }} />
                {videoData.description}
                <Divider style={{ width: "300px" }} />
                {adminUsers[0].find(
                  (user) => user.email === currentUser.email
                ) ? (
                  <FeedbackViewer />
                ) : (
                  <></>
                )}
              </Space>
            </Col>
          </Col>
          <Col span={5}>
            <FeedbackForm />
            <Divider orientation="left">Resources</Divider>​
            <Space direction="vertical">
              {videoData.github_links !== [] &&
                videoData.github_links.map((value) => (
                  <a
                    key={value.uuid}
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Space>
                      <GithubOutlined />
                      {value.desc}
                    </Space>
                  </a>
                ))}
              {videoData.slides !== [] &&
                videoData.slides.map((value) => (
                  <a
                    key={value.uuid}
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Space>
                      <FundProjectionScreenOutlined /> {value.desc}
                    </Space>
                  </a>
                ))}
              {videoData.other_links.map((value) => (
                <a
                  key={value.uuid}
                  href={value.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Space>
                    <FileTextOutlined />
                    {value.desc}
                  </Space>
                </a>
              ))}
            </Space>
            <Divider orientation="left">Timestamps</Divider>
            <Space size="small" direction="vertical">
              {videoData.timestamps.map((value) => {
                return (
                  <Button
                    key={value.uuid}
                    style={{ width: "305px", textAlign: "left" }}
                    onClick={() => seekToTimestamp(value.timeSecondsValue)}
                  >
                    {`${value.timeString} - ${value.timeDesc}`}
                  </Button>
                );
              })}
            </Space>
          </Col>
          <Col span={20}></Col>
        </Row>
      </>
    );
}
