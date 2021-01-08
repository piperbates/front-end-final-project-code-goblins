import { Select } from "antd";

const { Option } = Select;

export const tags = [
  "Front End",
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
  "Next.js",
];

export const selectTags = tags.map((tag) => <Option key={tag}>{tag}</Option>);
