import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import FeedbackForm from "../FeedbackForm";
import { Tabs, Spin } from "antd";

const { TabPane } = Tabs;

export default function LectureViewer({ allVideoData }) {
  const id = useLocation().pathname.split("/").pop();
  const player = useRef(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (videoData === null) {
      const data = allVideoData.filter((obj) => obj.id === Number(id));
      setVideoData(data[0]);
    }
  }, [videoData]);
  console.log(videoData);
  function seekToTimestamp(seconds) {
    return player.current.seekTo(seconds);
  }

  if (!videoData) {
    return <Spin />;
  }

  return (
    <>
      <h1>
        {videoData.title} - {videoData.lecturer}
      </h1>
      <p>
        <strong>video id:</strong> {videoData.id}
      </p>
      <div id="display">
        <ReactPlayer ref={player} url={videoData.video_url} controls={true} />
        <div id="video-sidebar">
          <div id="video-timestamps">
            <h3>Timestamps</h3>
            {videoData.timestamps.map((value) => {
              return (
                <div>
                  <button
                    onClick={() => seekToTimestamp(value.timeSecondsValue)}
                  >
                    {`${value.timeString} - ${value.timeDesc}`}
                  </button>
                  <br />
                </div>
              );
            })}
          </div>

          <Tabs size="small" style={{ width: "500px" }} defaultActiveKey="1">
            <TabPane tab="Video Description" key="1">
              <p>{videoData.description}</p>
            </TabPane>
            <TabPane tab="Resources" key="2">
              Here are some resource links <br />
              <a
                href={videoData.github_links}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              <br />
              <a
                href={videoData.slides}
                target="_blank"
                rel="noopener noreferrer"
              >
                Slides
              </a>
              <br />
              <a
                href={videoData.other_links}
                target="_blank"
                rel="noopener noreferrer"
              >
                Additional Reading
              </a>
            </TabPane>
          </Tabs>
        </div>
      </div>
      <FeedbackForm />
    </>
  );
}
