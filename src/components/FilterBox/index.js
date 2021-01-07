import React, { useState } from "react";
import "./style.css";
import { Tag } from "antd";
import TagFilter from "../TagFilter";



function FilterBox() {
    const tagsData = ["Front End",
    "Back End",
    "React",
    "Array Methods",
    "Loops",
    "Functions",
    "APIs",
    "Fetch",
    "SQL",
    "Postgres",
    "Node",
    "Express",
    "Jest",
    "Testing",
    "OOP",
    "Canvas",
    "useEffect",
    "React-router",
    "Model View Controller",
    "useReducer",
    "Custom hooks",
    "Auth",
    "Reduce",
    "Web Sockets",
    "Test Driven Development",
    "Nodemailer",
    "React Context",
    "Media Queries",
    "CSS",
    "Promises",
    "Gatsby",
    "Next.js"];



  return (
    <>
      <div id="filter-box">
        <TagFilter tagsData={tagsData}/>
      </div>
    </>
  );
}

// const FilterBox = new HotTags();

// ReactDOM.render(<HotTags />, document.getElementById('container'));
export default FilterBox;
