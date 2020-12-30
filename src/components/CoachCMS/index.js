import React from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';
import Tags from "./tags";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  function CoachCMS () {
    const onFinish = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Lecturer"
          name="lecturer"
          rules={[
            {
              required: true,
              message: 'Please input an Lecturer!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Video URL"
          name="video-url"
          rules={[
            {
              required: true,
              message: 'Please input Video URL!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thumbnail URL"
          name="thumbnail-url"
          rules={[
            {
              required: true,
              message: 'Please input Thumbnail URL!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Tags />

        <Form.Item
          label="Lecture Date"
          name="lecture-date"
          rules={[
            {
              required: true,
              message: 'Please input Lecture Date!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Bootcamp Week"
          name="bootcamp week"
          rules={[
            {
              required: true,
              message: 'Please input Bootcamp week!',
            },
          ]}
        > {/* Drop down */}
          <Input />
        </Form.Item>

        <Form.Item
          label="Video Description"
          name="video-description"
          rules={[
            {
              required: true,
              message: 'Please input Video Description!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Github Links"
          name="github-links"
          rules={[
            {
              required: true,
              message: 'Please input Github Links!',
            },
          ]}
        >
          <Input />
        </Form.Item>{/* Array */}

        <Form.Item
          label="Slides"
          name="slides"
          rules={[
            {
              required: true,
              message: 'Please input Slides!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Other Links"
          name="other-links"
          rules={[
            {
              required: false,
              message: 'Please input Other Links!',
            },
          ]}
        >
          <Input />
        </Form.Item>{/* Array */}
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

export default CoachCMS