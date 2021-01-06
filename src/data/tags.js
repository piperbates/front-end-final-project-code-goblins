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
  "AWS",
  "JWT",
  "front end",
  "back end",
  "array methods",
  "loops",
  "functions",
  "fetch",
  "postgreSQL",
  "SQL",
  "testing",
  "OOP",
  "canvas",
  "useEffect",
  "useState",
  "hooks",
  "react router",
  "model view controller",
  "MVC",
  "useReducer",
  "custom hooks",
  "authorisation",
  "authentication",
  "web sockets",
  "TDD",
  "nodemailer",
  "CSS",
  "promises",
  "Gatsby",
  "Nextjs",
];

const selectTags = options.map((tag) => <Option key={tag}>{tag}</Option>);

export default selectTags;
