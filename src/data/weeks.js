import { Select } from "antd";
const { Option } = Select;

const weekData = [
  ["All Weeks", 0],
  ["Week 1", 1],
  ["Week 2", 2],
  ["Week 3", 3],
  ["Week 4", 4],
  ["Week 5", 5],
  ["Week 6", 6],
  ["Week 7", 7],
  ["Week 8", 8],
  ["Week 9", 9],
  ["Week 10", 10],
  ["Week 11", 11],
  ["Week 12", 12],
  ["Week 13", 13],
  ["Week 14", 14],
  ["Week 15", 15],
  ["Week 16", 16],
];

const weeks = weekData.map((week) => <Option key={week[1]}>{week[0]}</Option>);

export default weeks;
