import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;


function TagFilter({tagsData}) {
  const [state, setState] = useState({
    selectedTags: [],
  });

  console.log(state.selectedTags);

  function handleChange(tag, checked) {
    const { selectedTags } = state;
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    // console.log('You are interested in: ', nextSelectedTags);
    setState({ selectedTags: nextSelectedTags });
  }
  
  return (
    <>
        <div id="tag-box" className="filter-group">
          <p style={{ marginRight: 8 }}>Tags:</p>
          {tagsData.map((tag) => (
            <CheckableTag
              key={tag}
              checked={state.selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleChange(tag, checked)} style={{border: "1px solid #1890ff", padding: "3px", margin: "3px", fontSize: ".9em"}}
            >
              {tag}
            </CheckableTag>
          ))}
        </div>
    </>
  );
}
export default TagFilter;
