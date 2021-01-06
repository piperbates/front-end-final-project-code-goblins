import { Select } from "antd";

const { Option } = Select;

const options = [
  "node",
  "javscript",
  "react",
  "jest",
  "agile",
  "material ui",
  "scrum",
  "ant design",
  "express",
  "npm",
  "typescript",
  "REST",
  "API",
];

const selectTags = options.map((tag) => <Option key={tag}>{tag}</Option>);

export default selectTags;
