import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Input,
  message,
  Space,
  Popconfirm,
} from "antd";
import config from "../../config";
import {
  CloseCircleOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const CmsTagEditor = ({ tagEditorVisible, toggleTagDisplay }) => {
  const [tagData, setTagData] = useState(false);
  const [lastTagId, setLastTagId] = useState(null);
  const [tagDelete, setTagDelete] = useState(null);
  const [tagAdd, setTagAdd] = useState(null);
  const [form] = Form.useForm();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [tagInput, setTagInput] = useState(null);
  const [tagUpdate, setTagUpdate] = useState(null);

  useEffect(() => {
    const getTagData = async () => {
      const res = await fetch(config.BACKEND_URL_TAGS_GET_ALL_DATA);
      const data = await res.json();
      setTagData(data);
      if (data.length > 0) {
        let tempTagData = data.sort((a, b) => a.key - b.key);
        setLastTagId(tempTagData[tempTagData.length - 1].key);
      }
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

  useEffect(() => {
    const updateTag = async () => {
      await fetch(config.BACKEND_URL_TAGS_UPDATE, {
        method: "PATCH",
        body: JSON.stringify(tagUpdate),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    if (tagUpdate) {
      updateTag();
      message.success(`Tag updated`);
      setTagUpdate(null);
    }
  }, [tagUpdate]);

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
      <h3>Tag Editor</h3>
      <Form name="tagform" onFinish={submitTag} form={form}>
        <Space>
          <Form.Item label="Tag Name" name="name" rules={[{ required: true }]}>
            <Space>
              <Input placeholder="Enter tag name" style={{ width: "200px" }} />
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>

      <Table
        dataSource={tagData}
        size="small"
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
      >
        <Column title="ID" dataIndex="key" key="key" />
        <Column
          title="Tag"
          key="tag"
          render={(record) => (
            <Input
              defaultValue={record.tag}
              bordered={false}
              disabled={inputDisabled}
              onChange={(e) =>
                setTagInput({
                  updateRecord: record.key,
                  updateValue: e.target.value,
                })
              }
            />
          )}
        />

        <Column
          title="Delete"
          key="delete"
          render={(record) => (
            <Popconfirm
              title={`Are you sure you want to delete '${record.tag}'`}
              okText={`delete`}
              cancelText={`cancel`}
              onConfirm={() => setTagDelete(record)}
            >
              <CloseCircleOutlined />
            </Popconfirm>
          )}
        />
      </Table>
      {inputDisabled ? (
        <p style={{ color: "green" }}>Viewing Mode</p>
      ) : (
        <p style={{ color: "red" }}>Editing Mode</p>
      )}
      <Space>
        <Button onClick={() => setInputDisabled(!inputDisabled)}>
          Edit <EditOutlined />
        </Button>
        <Button
          onClick={() => {
            setTagUpdate(tagInput);
            setTagInput(null);
          }}
          disabled={(inputDisabled && !tagInput) || !tagInput ? true : false}
        >
          Save <SaveOutlined />
        </Button>
      </Space>
    </Modal>
  );
};

export default CmsTagEditor;
