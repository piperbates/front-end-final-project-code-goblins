import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import selectTags from "../../data/tags"; //datasource

const ruleSetRequired = [
  {
    required: true,
    message: "Input required",
  },
];

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

function CoachCMS() {
  const [tags, setTags] = useState([]);
  const [form] = Form.useForm();

  const submitForm = (values) => {
    console.log({ ...values, tags: tags });
  };

  const onReset = () => {
    form.resetFields();
    setTags([]);
  };

  return (
    <>
      <h1>Coach CMS Form</h1>
      <Form
        {...layout}
        name="cms"
        form={form}
        initialValues={{
          remember: true,
        }}
        onFinish={submitForm}
      >
        <Form.Item
          label="Video Title"
          name="videoTitle"
          rules={ruleSetRequired}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Lecturer Name"
          name="lecturer"
          rules={ruleSetRequired}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Video URL" name="videoUrl" rules={ruleSetRequired}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Thumbnail URL"
          name="thumbnailUrl"
          rules={ruleSetRequired}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Tags" rules={ruleSetRequired}>
          <Select
            name="tags"
            mode="multiple"
            value={tags}
            allowClear
            style={{ width: "100%" }}
            placeholder="Select tags"
            onChange={(value) => {
              setTags(value);
            }}
          >
            {selectTags}
          </Select>
        </Form.Item>

        <Form.Item label="Lecture Date" name="date" rules={ruleSetRequired}>
          <DatePicker />
        </Form.Item>
        <Form.Item label="Bootcamp Week" name="week" rules={ruleSetRequired}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Video Description"
          name="videoDesc"
          rules={ruleSetRequired}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Github Links">
          <Form.List name="gitLinks">
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
                      name={[field.name, "gitlink"]}
                      style={{ width: "300px" }}
                      fieldKey={[field.fieldKey, "gitlink"]}
                      rules={ruleSetRequired}
                    >
                      <Input placeholder="url" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
          <Form.List name="slideLinks">
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
                      name={[field.name, "slidelink"]}
                      style={{ width: "300px" }}
                      fieldKey={[field.fieldKey, "slidelink"]}
                      rules={ruleSetRequired}
                    >
                      <Input placeholder="url" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
          <Form.List name="otherLinks">
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
                      name={[field.name, "otherlink"]}
                      style={{ width: "300px" }}
                      fieldKey={[field.fieldKey, "otherlink"]}
                      rules={ruleSetRequired}
                    >
                      <Input placeholder="url" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
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
    </>
  );
}

export default CoachCMS;
