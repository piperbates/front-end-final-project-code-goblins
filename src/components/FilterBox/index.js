import React, { useContext } from "react";
import "./style.css";
import TagFilter from "../TagFilter";
import TagDropdown from "../TagDropdown";
import weeks from "../../data/weeks";
import tutors from "../../data/tutors";
import { tags } from "../../data/tags";

import { SearchContext } from "../../contexts/searchContext";

function FilterBox() {
  const { getSearchTags, getSearchWeek, getSearchLecturer } = useContext(
    SearchContext
  );

  return (
    <div id="filter-box">
      <TagFilter data={tags} text="Tags" searchTags={getSearchTags} />
      <TagDropdown data={weeks} searchFunction={getSearchWeek} />
      <TagDropdown data={tutors} searchFunction={getSearchLecturer} />
    </div>
  );
}

export default FilterBox;
