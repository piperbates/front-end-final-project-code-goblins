import React, { useState } from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Modal, Button, Input } from "antd";
const { TextArea } = Input;

export default function FeedbackModal() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  function postFeedback(videoId) {
    fetch(`http://localhost:5000/feedback`, {
      method: "post",
      body: JSON.stringify({
        feedback: feedback,
        videoId: videoId /* Take from params */,
      }),
      headers: { "Content-Type": "application/json" },
      //Validation: ContentType
    })
      .then((res) => res.json()) //res.json() is an async function
      .then((data) => {
        console.log(data, "Thanks for the data");
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
      feedback: feedback,
    };
    postFeedback(feedback);
    console.log(feedbackToSubmit.feedback);
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
