import { Select } from "antd";
const { Option } = Select;

const weekData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const weeks = weekData.map((week) => (
  <Option key={week}>{`Week ${week}`}</Option>
));

weeks.unshift(<Option key={"All Weeks"}>{"All Weeks"}</Option>);

export default weeks;

/*
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
*/
