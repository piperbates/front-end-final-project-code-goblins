import React, { useState } from "react";

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");

  function search(value) {
    setSearchText(value);
  }
  return (
    <SearchContext.Provider value={{ searchText, search }}>
      {children}
    </SearchContext.Provider>
  );
}
