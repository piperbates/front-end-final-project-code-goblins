import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
  TimePicker,
  Spin,
  Switch,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import selectTags from "../../data/tags"; //new datasource, see data folder /******** API + DB TABLE REQUIRED ********/
import tutors from "../../data/tutors"; //new datasource, see data folder /******** API + DB TABLE REQUIRED ********/

import "./style.css";

const { Option } = Select;

//global required field rules object, default false
const ruleSetRequired = [
  {
    required: true,
    message: "Input required",
  },
];

//simple layout configuation objects
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

//start of component function
function CoachCMS() {
  const [tags, setTags] = useState([]); //used for tags field
  const [vimeoVideoSelect, setVimeoVideoSelect] = useState([]); //used for API call to vimeo for video selector
  const [guestLecturer, setGuestLecturer] = useState(false);
  const [tutorialVideo, setTutorialVideo] = useState(false);

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

  //direct form control via useform - do not use setState
  const [form] = Form.useForm();

  //time converstion function for form submit object, returns total seconds for each instance
  function timeCovertToSeconds(timeString) {
    const timeSplit = String(timeString).split(" ")[4].split(":");
    const hoursToSeconds = Number(timeSplit[0]) * 60 * 60;
    const minutesToSeconds = Number(timeSplit[1]) * 60;
    const timeInSeconds =
      hoursToSeconds + minutesToSeconds + Number(timeSplit[2]);
    return timeInSeconds;
  }

  const setLinkType = (object, resource) =>
    object
      ? object.map((obj) => Object.assign(obj, { type: resource }))
      : [{ type: resource }];

  //submit form function
  const submitForm = (values) => {
    const timestamps = values.timestamps.map((timeObj) => {
      return {
        timeString: String(timeObj.timestampSelect._d).split(" ")[4],
        timeSecondsValue: timeCovertToSeconds(timeObj.timestampSelect._d),
        timeDesc: timeObj.timestampDesc,
      };
    });
    postResource({
      ...values,
      tags: tags,
      date: String(values.lecture_date._d).split(" ").slice(0, 4).join(" "),
      timestamps: timestamps,
      github_links: setLinkType(values.github_links, "github"),
      slides: setLinkType(values.slides, "presentation slide"),
      other_links: setLinkType(values.other_links, "additional reading"),
    });

    // onReset();
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
    const api = "/";
    await fetch(process.env.REACT_APP_BACKEND_URL + api, {
      method: "POST",
      body: JSON.stringify(resource),
      headers: { "Content-Type": "application/json" },
    });
    await message.success("Form data submitted successfully", 1.5, onReset());
  }

  //api call to vimeo for video selection, also creates and populates select component input
  useEffect(() => {
    async function getVimeoVideoList() {
      const response = await fetch(`https://api.vimeo.com/me/videos`, {
        method: "GET",
        headers: {
          Authorization: "bearer " + process.env.REACT_APP_VIMEO_TOKEN,
          "Content-Type": "application/json",
          Accept: "application/vnd.vimeo.*+json;version=3.4",
        },
      });
      const data = await response.json();

      setVimeoVideoSelect(
        <Select
          onChange={(value) => {
            form.setFieldsValue({
              title: value[0],
              video_url: value[1],
              thumbnail_url: value[2],
            });
          }}
        >
          {data.data.map((video) => (
            <Option
              key={video.link}
              value={[
                video.name,
                video.link,
                video.pictures.sizes[5].link,
                video.created_time,
              ]}
            >
              {`${video.name} - ${video.created_time
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}`}
            </Option>
          ))}
        </Select>
      );
    }
    getVimeoVideoList();
  }, [form]);

  //start of rendering
  return (
    <>
      <h1>Coach CMS Form</h1>
      <div id="cms-page">
        <div id="cms-info">
          <p>
            Welcome Coaches! Please use this form to upload lecture and tutorial
            videos. For lectures please also upload the GitHub Classroom link
            and a link to the lecture slides. <br />
            Feel free to also add some links you think bootcampers might find
            helpful when tackling this topic. <br />
            Remember to select all relevant tags and add some useful timestamps.
            For example, what time does the coding demo start? Add a timestamp
            with a short title so bootcampers can skip to the best bits of your
            lecture.
          </p>
        </div>

        <div id="cms-div">
          <Form
            {...layout}
            style={{
              width: "auto",
            }}
            name="cms"
            form={form}
            initialValues={{
              remember: false,
            }}
            onFinish={submitForm}
            onFinishFailed={(value) => submitFailed(value)}
          >
            <Form.Item label="Vimeo API Video Select">
              {!!vimeoVideoSelect ? vimeoVideoSelect : <Spin />}
            </Form.Item>

            <Form.Item label="Video Title" name="title" rules={ruleSetRequired}>
              <Input />
            </Form.Item>

            <Form.Item label="Guest Lecturer" name="guest_lecture_switch">
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
                <Select allowClear>{tutors.map((tutor) => tutor)}</Select>
              ) : (
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label="Video URL"
              name="video_url"
              rules={ruleSetRequired}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thumbnail URL"
              name="thumbnail_url"
              rules={ruleSetRequired}
            >
              <Input />
            </Form.Item>

            <Form.Item label="tutorial" name="tutorial_switch">
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
                {selectTags}
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

            <Form.Item label="Timestamps" required>
              <Form.List name="timestamps" rules={ruleSetRequired}>
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
                          name={[field.name, "timestampSelect"]}
                          fieldKey={[field.fieldKey, "timestampSelect"]}
                          style={{ width: "140px" }}
                          rules={ruleSetRequired}
                        >
                          <TimePicker />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "timestampDesc"]}
                          label="Description"
                          style={{ width: "350px" }}
                          fieldKey={[field.fieldKey, "timestampDesc"]}
                          rules={ruleSetRequired}
                        >
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Timestamp
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
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
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
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
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default CoachCMS;
