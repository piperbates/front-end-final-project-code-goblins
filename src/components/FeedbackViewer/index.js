import React, { useState, useEffect } from "react";
import config from "../../config";
import "./style.css";
import moment from "moment";
import { Comment, Divider} from "antd";

export default function FeedbackViewer() {
  let url = window.location.href; //gets the whole url
  let split = url.split("/"); //splits the url into an array by /
  let ref = split[split.length - 1]; //Collects the last part of the array, which in this case will be the video id that is displaying on this page

  const [feedbackArr, setFeedbackArr] = useState([]);

  useEffect(() => {
    async function getFeedback() {
      const response = await fetch(config.BACKEND_URL_FEEDBACK_UPDATE + ref);
      const data = await response.json();
      setFeedbackArr(data.payload);
    }
    getFeedback();
  }, []);

  if (feedbackArr.length > 0) {
    return (
      <div>
        <h2>Feedback</h2>
        <div>
          <ul id="feedback-ul">
            {feedbackArr.map((item) => {
              return (<>
                <Comment
                  author={moment(item.created_at).format("DD MM yy hh:mma")}
                  bodyStyle={{padding: "0px", margin: "0px"}}
                  // avatar={<UserOutlined  style={{position: "absolute", marginTop: "10px"}} />}
                  content={item.feedback}
                />
                <Divider style={{padding: "0px", margin: "0px"}} />

                </>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
