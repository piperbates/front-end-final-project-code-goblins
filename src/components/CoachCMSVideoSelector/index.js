import React, { useState, useEffect } from "react";
import { Pagination, Spin, Card, Row, Space, Modal, Popover } from "antd";
import config from "../../config";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import moment from "moment";
import ReactPlayer from "react-player";
import DescriptionBox from "../CoachCMSDescription";

const CmsVideoSelector = ({ setFormVideoData }) => {
  const [pageOutput, setPageOutput] = useState(false);
  const [total, setTotal] = useState(0);
  const [paging, setPaging] = useState({ position: 1, paging: 30 });
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerData, setViewerData] = useState();

  useEffect(() => {
    async function getVimeoVideoData() {
      const response = await fetch(
        config.BACKEND_URL_VIMEO_GET_ALL_DATA +
          `?pagePosition=${paging.position}&perPageCount=${paging.paging}`
      );
      const data = await response.json();

      setTotal(data.total);
      setPageOutput(data.data);
      setViewerData(data.data[0]);
    }
    getVimeoVideoData();
  }, [paging]);

  const viewerDisplay = () => {
    setViewerVisible(!viewerVisible);
  };

  if (!pageOutput) {
    return <Spin />;
  }

  return (
    <>
      <Modal
        title="Video Viewer"
        visible={viewerVisible}
        width="fit-content"
        onCancel={viewerDisplay}
        footer={null}
        destroyOnClose
      >
        {!!viewerData && (
          <>
            <ReactPlayer
              url={viewerData.link}
              controls={true}
              style={{ marginBottom: "16px" }}
              playing
            />

            <DescriptionBox width={640} data={viewerData} />
          </>
        )}
      </Modal>

      <Space direction={"vertical"} size={"middle"}>
        <Row justify={"start"}>
          <h3>Vimeo API Video Selector</h3>
        </Row>
        <Row justify={"start"}>
          <Pagination
            onChange={(page, pageSize) => {
              setPaging({ position: page, paging: pageSize });
            }}
            total={total}
            current={paging.position}
            pageSize={paging.paging}
            defaultCurrent={1}
            defaultPageSize={30}
            responsive={true}
            pageSizeOptions={[30, 40, 50]}
          />
        </Row>
        <Row style={{ maxHeight: window.innerHeight - 225, overflow: "auto" }}>
          <Space wrap size={"middle"} style={{ justifyContent: "center" }}>
            {pageOutput ? (
              pageOutput.map((vItem) => (
                <Card
                  hoverable
                  style={{ width: "200px" }}
                  cover={
                    <img src={vItem.pictures.sizes[4].link} alt={vItem.name} />
                  }
                  key={vItem.link}
                  actions={[
                    <PlayCircleOutlined
                      key="play"
                      onClick={() => {
                        viewerDisplay();
                        setViewerData(vItem);
                      }}
                    />,
                    <Popover
                      content={<DescriptionBox width={350} data={vItem} />}
                    >
                      <QuestionCircleOutlined key="info" />
                    </Popover>,
                    <CheckCircleOutlined
                      key="select"
                      onClick={() =>
                        setFormVideoData({
                          title: vItem.name,
                          url: vItem.link,
                          thumbnail: vItem.pictures.sizes[4].link,
                        })
                      }
                    />,
                  ]}
                >
                  <Meta
                    title={vItem.name}
                    description={moment(vItem.created_time).format(
                      "DD MMM YYYY"
                    )}
                  />
                </Card>
              ))
            ) : (
              <Spin />
            )}
          </Space>
        </Row>
      </Space>
    </>
  );
};

export default CmsVideoSelector;
