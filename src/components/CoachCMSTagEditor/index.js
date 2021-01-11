import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form, Input, message, Space } from "antd";
import config from "../../config";

const CmsTagEditor = ({ tagEditorVisible, toggleTagDisplay }) => {
  const [tagData, setTagData] = useState(false);
  const [lastTagId, setLastTagId] = useState(null);
  const [tagDelete, setTagDelete] = useState(null);
  const [tagAdd, setTagAdd] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const getTagData = async () => {
      const res = await fetch(config.BACKEND_URL_TAGS_GET_ALL_DATA);
      const data = await res.json();
      setTagData(data);
      let tempTagData = data.sort((a, b) => a.key - b.key);
      setLastTagId(tempTagData[tempTagData.length - 1].key);
    };
    getTagData();
  }, [tagEditorVisible]);

  useEffect(() => {
    const deleteTag = async () => {
      await fetch(config.BACKEND_URL_TAGS_DELETE + `${tagDelete.key}`, {
        method: "DELETE",
      });
      setTagData(tagData.filter((tag) => tag.key !== tagDelete.key));
      message.success(`'${tagDelete.tag}' tag has been deleted`);
      setTagDelete(null);
    };
    if (tagDelete) {
      deleteTag();
    }
  }, [tagDelete]);

  useEffect(() => {
    const addTag = async () => {
      await fetch(config.BACKEND_URL_TAGS_ADD, {
        method: "POST",
        body: JSON.stringify({ tag: tagAdd }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTagData([...tagData, { key: lastTagId, tag: tagAdd }]);
      message.success(`'${tagAdd}' tag has been added`);
      setTagAdd(null);
    };
    if (tagAdd) {
      addTag();
    }
  }, [tagAdd]);
  console.log("tag modal rerender");
  const { Column } = Table;

  const submitTag = (submittedTag) => {
    let tagCheck = null;

    if (tagData) {
      tagCheck = tagData.some((value) => value.tag === submittedTag.name);
      if (tagCheck) {
        message.error(`Tag already exists`);
        form.resetFields();
      } else {
        setLastTagId(lastTagId + 1);
        setTagAdd(submittedTag.name);
        form.resetFields();
      }
    } else {
      setLastTagId(lastTagId + 1);
      setTagAdd(submittedTag.name);
      form.resetFields();
    }
  };

  return (
    <Modal
      visible={tagEditorVisible}
      onCancel={toggleTagDisplay}
      footer={null}
      closable
      destroyOnClose
    >
      <Form name="tagform" onFinish={submitTag} form={form}>
        <Space>
          <Form.Item label="Tag Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter tag name" style={{ width: "200px" }} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>

      <Table
        dataSource={tagData}
        size="small"
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
      >
        <Column title="ID" dataIndex="key" key="key" />
        <Column title="Tag" dataIndex="tag" key="tag" />
        <Column
          title="Delete"
          key="delete"
          render={(record) => (
            <Button onClick={() => setTagDelete(record)}>x</Button>
          )}
        />
      </Table>
    </Modal>
  );
};

export default CmsTagEditor;
