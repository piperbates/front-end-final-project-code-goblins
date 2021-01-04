import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Tags from "./tags";

const ruleSet = [
  {
    required: false,
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
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      name="cms"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item label="Video Title" name="videoTitle" rules={ruleSet}>
        <Input />
      </Form.Item>
      <Form.Item label="Lecturer Name" name="lecturer" rules={ruleSet}>
        <Input />
      </Form.Item>
      <Form.Item label="Video URL" name="videoUrl" rules={ruleSet}>
        <Input />
      </Form.Item>
      <Form.Item label="Thumbnail URL" name="thumbnailUrl" rules={ruleSet}>
        <Input />
      </Form.Item>
      <Form.Item label="Tags" name="tags" rules={ruleSet}>
        <Tags name="tags" />
      </Form.Item>

      <Form.Item label="Lecture Date" name="date" rules={ruleSet} showToday>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Bootcamp Week" name="week" rules={ruleSet}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Video Description" name="videoDesc" rules={ruleSet}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Github Links" rules={ruleSet}>
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
                    fieldKey={[field.fieldKey, "gitlink"]}
                    rules={ruleSet}
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

      <Form.Item label="Slide Links" rules={ruleSet}>
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
                    fieldKey={[field.fieldKey, "slidelink"]}
                    rules={ruleSet}
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

      <Form.Item label="Other Links" rules={ruleSet}>
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
                    fieldKey={[field.fieldKey, "otherlink"]}
                    rules={ruleSet}
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
      </Form.Item>
    </Form>
  );
}

export default CoachCMS;
