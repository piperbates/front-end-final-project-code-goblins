import React, { useState, useEffect } from "react";

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");
  const [searchWeek, setSearchWeek] = useState("All Weeks");
  const [searchLecturer, setSearchLecturer] = useState("All Lecturers");
  const [tagState, setTagState] = useState({
    selectedTags: [],
  });

  useEffect(() => {
    let searchArray = [];

    //search text
    if (searchText) {
      searchArray.push(["search", searchText]);
    }

    //week
    if (searchWeek !== "All Weeks") {
      searchArray.push(["week", searchWeek]);
    }

    //lecturer
    if (searchLecturer !== "All Lecturers") {
      searchArray.push(["lecturer", searchLecturer]);
    }

    //tags
    let searchTagsConvert = [];
    if (searchTags !== []) {
      searchTagsConvert = [...searchTags.map((tag) => ["tag", tag])];
    }

    searchArray = [...searchArray, ...searchTagsConvert];
    setSearchUrl(new URLSearchParams(searchArray).toString());
  }, [searchText, searchTags, searchWeek, searchLecturer]);

  function getSearchText(value) {
    setSearchText(value);
  }

  function getSearchTags(tags) {
    setSearchTags(tags);
  }

  function getSearchWeek(week) {
    setSearchWeek(week);
  }

  function getSearchLecturer(lecturer) {
    setSearchLecturer(lecturer);
  }

  return (
    <SearchContext.Provider
      value={{
        searchText,
        getSearchText,
        getSearchTags,
        searchUrl,
        getSearchWeek,
        getSearchLecturer,
        searchLecturer,
        searchWeek,
        setTagState,
        tagState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
