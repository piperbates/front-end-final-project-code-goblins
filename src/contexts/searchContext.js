import React, { useState, useEffect } from "react";

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState();
  const [searchUrl, setSearchUrl] = useState("");

  useEffect(() => {
    const searchTextConvert = ["search", searchText];
    const tagsConvert = [];
    const searchArray = [searchTextConvert]; //tagsConvert
    const url = new URLSearchParams(searchArray);
    setSearchUrl(url.toString());
  }, [searchText]);

  function search(value) {
    setSearchText([value]);
  }

  function getSearchTags(tags) {
    console.log(tags);
  }

  return (
    <SearchContext.Provider
      value={{ searchText, search, getSearchTags, searchUrl }}
    >
      {children}
    </SearchContext.Provider>
  );
}
