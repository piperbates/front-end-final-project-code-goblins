import React, { useState, useContext } from "react";
import "./style.css";
import TagFilter from "../TagFilter";
import TagDropdown from "../TagDropdown";
import weeks from "../../data/weeks";
import tutors from "../../data/tutors";
import { tags } from "../../data/tags";
import { Space } from "antd";
import { SearchContext } from "../../contexts/searchContext";

function FilterBox() {
  const [searchObj, setSearchObj] = useState({});
  const { getSearchTags, getSearchWeek, getSearchLecturer } = useContext(
    SearchContext
  );
  // function setSearchData(array) {
  //   Sets the search data to the search
  //   console.log(array);
  // }

  return (
    <div id="filter-box">
      <TagFilter data={tags} text="Tags" searchTags={getSearchTags} />
      <TagDropdown data={weeks} searchFunction={getSearchWeek} />
      <TagDropdown data={tutors} searchFunction={getSearchLecturer} />
    </div>
  );
}

export default FilterBox;

/* <TagFilter setSearchData={setSearchData} text="Weeks" data={weeks}/> */
