import React, { useState } from "react";
import { Select } from "antd";

//function attached to selection component
function handleChange(value) {
  console.log(`${value}`);
}

//start of component render
function TagDropdown({ data }) {
  const [dataOptions, setDataOptions] = useState(data);

  if (!dataOptions) {
    return <Select loading></Select>;
  } else
    return (
      <Select
        defaultValue={dataOptions[0].key}
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {dataOptions}
      </Select>
    );
}
export default TagDropdown;
