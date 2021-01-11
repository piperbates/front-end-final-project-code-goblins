import React, { useEffect, useState, useContext } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
  Switch,
  message,
  Row,
  Col,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import tutors from "../../data/tutors"; //new datasource, see data folder /******** API + DB TABLE REQUIRED ********/
import { SearchContext } from "../../contexts/searchContext";
import { Redirect } from "react-router-dom";
import TimestampSelector from "../CoachCMSTimestampSelector";
import config from "../../config";
import CmsVideoSelector from "../CoachCMSVideoSelector";
import { v4 as uuidv4 } from "uuid";
import CmsDropdown from "../CoachCMSDropdown";
import CmsTagEditor from "../CoachCMSTagEditor";

//global required field rules object, default false
const ruleSetRequired = [
  {
    required: true,
    message: "Input required",
  },
];

//simple layout configuation objects
const formLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 12,
    span: 24,
  },
};

//start of component function
function CoachCMS() {
  const [tags, setTags] = useState([]); //used for tags field
  const { searchText } = useContext(SearchContext);
  const [previousSearch] = useState(searchText);
  const [guestLecturer, setGuestLecturer] = useState(false);
  const [tutorialVideo, setTutorialVideo] = useState(false);
  const [timestampsVisible, setTimestampsVisible] = useState(false);
  const [timestampVideoUrl, setTimestampVideoUrl] = useState(false);
  const [timestampData, setTimestampData] = useState("");
  const [form] = Form.useForm();
  const [tagEditorVisible, setTagEditorVisible] = useState(false);
  const [tagData, setTagData] = useState(false);
  const [lastTagId, setLastTagId] = useState(null);

  useEffect(() => {
    const getTagData = async () => {
      const res = await fetch(config.BACKEND_URL_TAGS_GET_ALL_DATA);
      const data = await res.json();
      setTagData(data.sort((a, b) => a.tag - b.tag));
      let tempTagData = data.sort((a, b) => a.key - b.key);
      setLastTagId(tempTagData[tempTagData.length - 1].key);
    };
    getTagData();
  }, [tagEditorVisible]);

  useEffect(() => {
    const additionalTags = tags.filter(
      (tag) => tag !== "lecture" && tag !== "guest lecture"
    );

    if (additionalTags.length > 0 && !guestLecturer) {
      setTags([...additionalTags, "lecture"]);
    } else if (additionalTags.length > 0 && guestLecturer) {
      setTags([...additionalTags, "guest lecture"]);
    } else if (additionalTags.length === 0 && !guestLecturer) {
      setTags(["lecture"]);
    } else if (additionalTags.length === 0 && guestLecturer) {
      setTags(["guest lecture"]);
    }
  }, [guestLecturer]);

  useEffect(() => {
    const additionalTags = tags.filter((tag) => tag !== "tutorial");

    if (additionalTags.length > 0 && !tutorialVideo) {
      setTags([...additionalTags]);
    } else if (additionalTags.length > 0 && tutorialVideo) {
      setTags([...additionalTags, "tutorial"]);
    }
  }, [tutorialVideo]);

  if (searchText !== previousSearch) {
    return <Redirect exact to="/" />;
  }

  const { Option } = Select;

  //set form data from api video selector
  const setFormVideoData = (selectData) => {
    setTimestampVideoUrl(selectData.url);
    form.setFieldsValue({
      title: selectData.title,
      video_url: selectData.url,
      thumbnail_url: selectData.thumbnail,
    });
    message.success("Video selected. Added to form data.", 1);
  };

  //link formatter for form submission object
  const setLinkType = (object, resource) =>
    object ? object.map((obj) => Object.assign(obj, { type: resource })) : [];

  //submit form function
  const submitForm = (values) => {
    postResource({
      ...values,
      tags: tags,
      date: String(values.lecture_date._d).split(" ").slice(0, 4).join(" "),
      timestamps: timestampData,
      github_links: setLinkType(values.github_links, "github"),
      slides: setLinkType(values.slides, "presentation slide"),
      other_links: setLinkType(values.other_links, "additional reading"),
    });
  };

  const submitFailed = (value) => {
    value.errorFields.map((value) =>
      message.error(
        `${
          value.name[0].slice(0, 1).toUpperCase() + value.name[0].slice(1)
        } field ${value.errors[0].toLowerCase()} `,
        2.5
      )
    );
  };

  //form reset button function
  const onReset = () => {
    form.resetFields();
    form.setFieldsValue({
      vimeoAPI: "",
    });
    setTags([]);
  };

  //Post request async function
  async function postResource(resource) {
    await fetch(config.BACKEND_URL_ADD_CONTENT, {
      method: "POST",
      body: JSON.stringify(resource),
      headers: { "Content-Type": "application/json" },
    });
    await message.success("Form data submitted successfully", 1.5, onReset());
  }

  //show modal
  const modalDisplay = () => {
    const videoUrlInputValue = form.getFieldValue("video_url");
    setTimestampVideoUrl(videoUrlInputValue);
    setTimestampsVisible(!timestampsVisible);
  };

  const modalHide = () => {
    setTimestampsVisible(false);
  };

  const getTimeStampData = (obj) => {
    setTimestampData(obj.timestamps);
  };

  const toggleTagDisplay = () => {
    setTagEditorVisible(!tagEditorVisible);
  };

  //start of rendering
  return (
    <div>
      <TimestampSelector
        timestampsVisible={timestampsVisible}
        modalDisplay={modalDisplay}
        timestampVideoUrl={timestampVideoUrl}
        ruleSetRequired={ruleSetRequired}
        submitFailed={submitFailed}
        modalHide={modalHide}
        getTimeStampData={getTimeStampData}
      />
      <CmsTagEditor
        tagEditorVisible={tagEditorVisible}
        toggleTagDisplay={toggleTagDisplay}
      />

      <Space direction="vertical">
        <Row justify="end">
          <Space>
            <h1>Lecture Management</h1>
          </Space>
        </Row>

        <Row justify="start">
          <CmsDropdown toggleTagDisplay={toggleTagDisplay} />
        </Row>

        <Row justify={"center"}>
          <Col span={10}>
            <CmsVideoSelector setFormVideoData={setFormVideoData} />
          </Col>

          <Col span={13}>
            <h3 style={{ marginBottom: "1em" }}>Form Data</h3>
            <Form
              style={{ padding: "1em" }}
              {...formLayout}
              name="cms"
              form={form}
              initialValues={{
                remember: false,
              }}
              onFinish={submitForm}
              onFinishFailed={(value) => submitFailed(value)}
            >
              <Form.Item
                label="Video Title"
                name="title"
                rules={ruleSetRequired}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Guest Lecturer"
                // name="guest_lecture_switch"
                valuePropName="checked"
              >
                <Switch
                  onChange={() => {
                    setGuestLecturer(!guestLecturer);
                  }}
                />
              </Form.Item>

              <Form.Item
                label={!guestLecturer ? "Lecturer Name" : "Guest Lecturer Name"}
                name="lecturer"
                rules={ruleSetRequired}
              >
                {!guestLecturer ? (
                  <Select>{tutors.filter((tutor, index) => index > 0)}</Select>
                ) : (
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                label="Video URL"
                name="video_url"
                rules={ruleSetRequired}
              >
                <Input onChange={(e) => setTimestampVideoUrl(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Thumbnail URL"
                name="thumbnail_url"
                rules={ruleSetRequired}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Tutorial"
                // name="tutorial_switch"
                valuePropName="checked"
              >
                <Switch
                  onChange={() => {
                    setTutorialVideo(!tutorialVideo);
                  }}
                />
              </Form.Item>

              <Form.Item label="Tags" rules={ruleSetRequired}>
                <Select
                  mode="multiple"
                  name="tags"
                  value={tags}
                  placeholder="Select tags"
                  onChange={(value) => {
                    setTags(value);
                  }}
                >
                  {tagData
                    ? tagData.map((value) => (
                        <Option key={value.tag}>{value.tag}</Option>
                      ))
                    : ""}
                </Select>
              </Form.Item>

              <Form.Item
                label={!guestLecturer ? "Lecture Date" : "Guest Speaker Date"}
                name="lecture_date"
                rules={ruleSetRequired}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="Bootcamp Week"
                name="bootcamp_week"
                rules={ruleSetRequired}
              >
                <InputNumber min={1} />
              </Form.Item>

              <Form.Item
                label="Video Description"
                name="description"
                rules={ruleSetRequired}
              >
                <Input.TextArea autoSize={{ minRows: 8 }} />
              </Form.Item>

              <Form.Item label={"Timestamps"}>
                <Button
                  onClick={() =>
                    timestampVideoUrl &&
                    timestampVideoUrl.slice(0, 18) === "https://vimeo.com/" &&
                    typeof Number(timestampVideoUrl.slice(0, 18)) === "number"
                      ? modalDisplay()
                      : message.warn(
                          "Please select a video or update the video url field"
                        )
                  }
                >
                  Open Timestamp Editor
                </Button>
              </Form.Item>

              <Form.Item label="Github Links">
                <Form.List name="github_links">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 0 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            name={[field.name, "link"]}
                            fieldKey={[field.fieldKey, "link"]}
                          >
                            <Input placeholder="url" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "desc"]}
                            fieldKey={[field.fieldKey, "desc"]}
                          >
                            <Input placeholder="description" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "uuid"]}
                            fieldKey={[field.fieldKey, "uuid"]}
                            hidden
                            initialValue={uuidv4()}
                          ></Form.Item>

                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Github Link
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Slide Links">
                <Form.List name="slides">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 0 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            name={[field.name, "link"]}
                            fieldKey={[field.fieldKey, "link"]}
                          >
                            <Input placeholder="url" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "desc"]}
                            fieldKey={[field.fieldKey, "desc"]}
                          >
                            <Input placeholder="description" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "uuid"]}
                            fieldKey={[field.fieldKey, "uuid"]}
                            hidden
                            initialValue={uuidv4()}
                          ></Form.Item>

                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Slide Link
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item label="Other Links">
                <Form.List name="other_links">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 0 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...field}
                            name={[field.name, "link"]}
                            fieldKey={[field.fieldKey, "link"]}
                          >
                            <Input placeholder="url" />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, "desc"]}
                            fieldKey={[field.fieldKey, "desc"]}
                          >
                            <Input placeholder="description" />
                          </Form.Item>

                          <Form.Item
                            {...field}
                            name={[field.name, "uuid"]}
                            fieldKey={[field.fieldKey, "uuid"]}
                            hidden
                            initialValue={uuidv4()}
                          ></Form.Item>

                          <MinusCircleOutlined
                            onClick={() => remove(field.name)}
                          />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          Add Other Link
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default CoachCMS;
