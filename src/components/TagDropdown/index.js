import React from "react";
import { Select } from "antd";
import weeks from "../../data/weeks"

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function TagDropdown() {
  return (
    (
      <>
        <Select
          style={{ width: 120 }}
          onChange={handleChange}
        >
          {weeks.map((week) => week)}
        </Select>
      </>
    ),
    document.getElementById("container")
  );
}
export default TagDropdown;
