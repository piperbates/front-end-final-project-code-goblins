import React, { useContext } from "react";
import "./style.css";

import { Button, Select, Tag, Spin } from "antd";


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
  } = useContext(SearchContext);

  function handleChange(tag, checked) {
    const { selectedTags } = tagState;

    let nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setTagState({ selectedTags: nextSelectedTags });
    getSearchTags(nextSelectedTags);
  }

  return (
    <div id="filter-box">
    
 {weekData ? (
        <Select
          value={searchWeek}
          defaultValue={searchWeek}
          style={{ width: 120, margin: "5px" }}
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
          style={{ width: 120 }}
          onChange={(value) => getSearchLecturer(value)}
        >
          {lecturerData}
        </Select>
      ) : (
        <Select loading></Select>
      )}
      <p>Search by Tags:</p>
      <div className="filter-group" style={{margin: "3px"}}>
        {tagData ? (
          tagData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={tagState.selectedTags.indexOf(tag) > -1}
              onChange={(checked) => {
                handleChange(tag, checked);
              }}
              style={{
                border: "1px solid #1890ff",
                padding: "3px",
                margin: "5px 3px",
                fontSize: ".9em",
              }}
            >
              {tag}
            </CheckableTag>
          ))
        ) : (
          <Spin />
        )}
      </div>
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

     
    </div>
  );
}

export default FilterBox;
