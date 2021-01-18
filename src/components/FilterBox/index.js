import React, { useContext } from "react";
// import "./style.css";

import { Button, Select, Tag, Spin, Space, Row, Col } from "antd";

import { SearchContext } from "../../contexts/searchContext";

const { CheckableTag } = Tag;

function FilterBox({ lecturerData, weekData, tagData }) {
  const {
    getSearchTags,
    getSearchWeek,
    getSearchLecturer,
    searchLecturer,
    searchWeek,
    setTagState,
    tagState,
    handleTagChange,
    getSearchText,
  } = useContext(SearchContext);

  return (
    <Space direction="vertical" style={{ height: "100vh" }}>
      <Space direction="vertical">
        {weekData ? (
          <Select
            value={searchWeek}
            defaultValue={searchWeek}
            style={{ width: "250px" }}
            onChange={(value) => getSearchWeek(value)}
          >
            {weekData}
          </Select>
        ) : (
          <Select loading></Select>
        )}

        {lecturerData ? (
          <Select
            value={searchLecturer}
            defaultValue={searchLecturer}
            style={{ width: "250px" }}
            onChange={(value) => getSearchLecturer(value)}
          >
            {lecturerData}
          </Select>
        ) : (
          <Select loading></Select>
        )}
      </Space>
      <Row style={{ width: "250px" }}>
        {tagData ? (
          tagData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={tagState.selectedTags.indexOf(tag) > -1}
              onChange={(checked) => {
                handleTagChange(tag, checked);
              }}
              style={{
                border: "1px solid #1890ff",
                padding: "3px 5px",
                margin: "3px",
                fontSize: ".9em",
                userSelect: "none",
              }}
            >
              {tag}
            </CheckableTag>
          ))
        ) : (
          <Spin />
        )}
      </Row>
      <Button
        type="primary"
        onClick={() => {
          setTagState({
            selectedTags: [],
          });
          getSearchTags([]);
        }}
      >
        Clear Tags
      </Button>
      <Button
        type="primary"
        onClick={() => {
          getSearchText("");
          getSearchTags([]);
          getSearchWeek("All Weeks");
          getSearchLecturer("All Lecturers");
          setTagState({
            selectedTags: [],
          });
        }}
      >
        Reset Search
      </Button>
    </Space>
  );
}

export default FilterBox;
