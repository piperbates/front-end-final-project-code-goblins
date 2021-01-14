import React, { useState, useEffect } from "react";
import {
  Pagination,
  Spin,
  Card,
  Row,
  Space,
  Modal,
  Popover,
  Tooltip,
  Skeleton,
} from "antd";
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

const CmsVideoSelector = ({
  setFormVideoData,
  modeSelector,
  pageOutput,
  updateVideoSelectPageOutput,
}) => {
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
      updateVideoSelectPageOutput(data.data);
      // setViewerData(data.data[0]);
    }
    if (modeSelector) {
      getVimeoVideoData();
    }
  }, [modeSelector, paging]);

  useEffect(() => {
    const getRecapVideoData = async () => {
      const response = await fetch(config.BACKEND_URL_SEARCH);
      const data = await response.json();

      updateVideoSelectPageOutput(data);
      setTotal(data.length);
    };
    if (!modeSelector) {
      getRecapVideoData();
    }
  }, [modeSelector, paging]);

  const viewerDisplay = () => {
    setViewerVisible(!viewerVisible);
  };

  if (!pageOutput || pageOutput === undefined) {
    return <Skeleton rows="20" />;
  } else
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
                url={modeSelector ? viewerData.link : viewerData.video_url}
                controls={true}
                style={{ marginBottom: "16px" }}
                playing
              />

              <DescriptionBox
                width={640}
                data={viewerData}
                modeSelector={modeSelector}
              />
            </>
          )}
        </Modal>

        <Space direction={"vertical"} size={"middle"}>
          <Row justify={"start"}>
            {modeSelector ? (
              <h3>Vimeo API Video Selector</h3>
            ) : (
              <h3>re:cap Video Editor</h3>
            )}
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
          <Row style={{ maxHeight: "1685px", overflow: "auto" }}>
            <Space wrap size={"middle"} style={{ justifyContent: "center" }}>
              {pageOutput ? (
                pageOutput.map((vItem) => (
                  <Card
                    hoverable
                    style={{ width: "200px" }}
                    cover={
                      <img
                        src={
                          modeSelector
                            ? vItem.pictures.sizes[4].link
                            : vItem.thumbnail_url
                        }
                        alt={modeSelector ? vItem.name : vItem.title}
                        onClick={() => {
                          viewerDisplay();
                          setViewerData(vItem);
                        }}
                      />
                    }
                    key={modeSelector ? vItem.link : vItem.video_url}
                    actions={[
                      <Tooltip title={"Play"}>
                        <PlayCircleOutlined
                          key="play"
                          onClick={() => {
                            viewerDisplay();
                            setViewerData(vItem);
                          }}
                        />
                      </Tooltip>,
                      <Popover
                        content={
                          <DescriptionBox
                            width={350}
                            data={vItem}
                            modeSelector={modeSelector}
                          />
                        }
                      >
                        <QuestionCircleOutlined key="info" />
                      </Popover>,
                      <Tooltip title={"Select"}>
                        <CheckCircleOutlined
                          key="select"
                          onClick={() => {
                            if (modeSelector) {
                              setFormVideoData({
                                title: vItem.name,
                                url: vItem.link,
                                thumbnail: vItem.pictures.sizes[4].link,
                              });
                            } else {
                              console.log(vItem);
                              // console.log(vItem.tags);
                              setFormVideoData({
                                title: vItem.title,
                                lecturer: vItem.lecturer,
                                url: vItem.video_url,
                                thumbnail: vItem.thumbnail_url,
                                tags: vItem.tags,
                                lecture_date: moment(vItem.lecture_date),
                                bootcamp_week: vItem.bootcamp_week,
                                cohort: vItem.cohort,
                                description: vItem.description,
                                timestamps: vItem.timestamps,
                                github_links: vItem.github_links,
                                slides: vItem.slides,
                                other_links: vItem.other_links,
                              });
                            }
                          }}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Meta
                      onClick={() => {
                        viewerDisplay();
                        setViewerData(vItem);
                      }}
                      title={modeSelector ? vItem.name : vItem.title}
                      description={moment(
                        modeSelector ? vItem.created_time : vItem.lecture_date
                      ).format("DD MMM YYYY")}
                    />
                  </Card>
                ))
              ) : (
                <>
                  <Spin />
                </>
              )}
            </Space>
          </Row>
        </Space>
      </>
    );
};

export default CmsVideoSelector;
