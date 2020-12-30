import React from "react";
import FeedbackForm from "../FeedbackForm"
import "./style.css";
import { Tabs } from 'antd';

const { TabPane } = Tabs;



export default function LectureViewer(){
    return <div>
        <h1>Video Title</h1>
        <h2>By lecturer</h2>
        <div id="display">
        <iframe src="https://player.vimeo.com/video/489461278" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        <div id="video-sidebar">
        <div id="video-timestamps">
            Timestamps go here
            <p>
                Timestamp 1<br/>
                Timestamp 2
            </p>
        </div>
          <FeedbackForm />

        <Tabs defaultActiveKey="1">
        <TabPane tab="Video Description" key="1">
        <p>This is a video about potatoes</p>
        </TabPane>
        <TabPane tab="Resources" key="2">
          Here are some resource links <br/>
          Github repo<br/>
          Slides<br/>
          Other stuff
        </TabPane>
     
      </Tabs>
        </div>

        
 
</div>
    </div>
}