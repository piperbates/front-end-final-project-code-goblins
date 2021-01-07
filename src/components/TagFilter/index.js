import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

function TagFilter({ text, data, setSearchData }) {
  const [state, setState] = useState({
    selectedTags: [],
  });

  // function clearAll(){
  //   //Clears all tags
  // }
  function handleChange(tag, checked) {
    const { selectedTags } = state;
    var nextSelectedTags;

    if (text === "Tags") { 
      nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
    } else {
      nextSelectedTags = checked
        ? [tag]
        : selectedTags.filter((t) => t !== tag);
    }
    setState({ selectedTags: nextSelectedTags });
    setSearchData(nextSelectedTags);
  }

  /* 
    
  */

  return (
    <>
      <div id={data} className="filter-group">
        <p style={{ marginRight: 8 }}>{text}:</p>
        {data.map((tag) => (
          <CheckableTag
            key={tag}
            checked={state.selectedTags.indexOf(tag) > -1}
            onChange={(checked) => handleChange(tag, checked)}
            style={{
              border: "1px solid #1890ff",
              padding: "3px",
              margin: "3px",
              fontSize: ".9em",
            }}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    </>
  );
}
export default TagFilter;
