import React, { useState } from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Modal, Button, Input } from "antd";
const { TextArea } = Input;
let url = window.location.href;
let split = url.split("/");
let ref = split[split.length - 1];
console.log({ref});

export default function FeedbackModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
 



  function postFeedback(value) {
    
    fetch(`http://localhost:5000/feedback`, {
      method: "post",
      body: JSON.stringify({
        videoId: value.videoId /* Take from params */,
        feedback: value.feedback
      }),
      headers: { "Content-Type": "application/json" },
      //Validation: ContentType
    })
      .then((res) => res.json()) //res.json() is an async function
      .then((data) => {
        console.log(data, "Thanks for the feedback: " + feedback);
        setFeedback("");

        setIsModalVisible(false);
      }) //In the browser
      .catch((error) => console.log(error, "my error")); //uncaught promise rejection. The promise throws and error and I need to catch otherwise it will be thrown into the ether
  }

  function handleClick(e) {
    // e.preventDefault();
    if (e.target.id === "feedback") {
      setFeedback(e.target.value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const feedbackToSubmit = {
      videoId: ref,
      feedback: feedback,
      
    };
    postFeedback(feedbackToSubmit);
    // console.log({feedbackToSubmit});
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Give Feedback
      </Button>
      <Modal
        title="Give Feedback on this lecture"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <div id="feedback-form-container">
            <form>
              <TextArea
                id="feedback"
                placeholder="Insert Feedback"
                value={feedback}
                onChange={handleClick}
              />
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
