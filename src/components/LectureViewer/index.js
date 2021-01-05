import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import "./style.css";
import FeedbackForm from "../FeedbackForm";
import { Tabs, Spin } from "antd";
import { DataContext } from "../../contexts/dataContext";

const { TabPane } = Tabs;

export default function LectureViewer() {
  const id = useLocation().pathname.split("/").pop();
  const player = useRef(null);
  const [videoData, setVideoData] = useState(null);
  const mockData = useContext(DataContext);

  useEffect(() => {
    if (videoData === null) {
      const data = mockData.filter((obj) => obj.id === Number(id));
      setVideoData(data[0]);
    }
  }, [videoData]);

  function seekToTimestamp(seconds) {
    return player.current.seekTo(seconds);
  }

  function convertSeconds(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return minutes === 0 && seconds === 0 ? `start` : `${minutes}m ${seconds}s`;
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
        <strong>video id:</strong> {id}
      </p>
      <div id="display">
        <ReactPlayer ref={player} url={videoData.url} controls={true} />
        <div id="video-sidebar">
          <div id="video-timestamps">
            <h3>Timestamps</h3>
            {videoData.timestamps.map((value) => {
              return (
                <div>
                  <button onClick={() => seekToTimestamp(value.time)}>
                    {`${convertSeconds(value.time)} - ${value.timedesc}`}
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
              Github repo
              <br />
              Slides
              <br />
              Other stuff
            </TabPane>
          </Tabs>
        </div>
      </div>
      <FeedbackForm />
    </>
  );
}
