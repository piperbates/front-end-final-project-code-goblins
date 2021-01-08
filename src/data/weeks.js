import { Select } from "antd";
const { Option } = Select;

const weeks = [];

let lengthOfBootcamp = 16;

for (let i = 1; i < lengthOfBootcamp + 1; i++) {
  weeks.push(<Option key={i}>{`Week ${i}`}</Option>);
}

export default weeks;
