import { Select } from "antd";

const { Option } = Select;

const options = [
  "All Lecturers",
  "Chris Meah",
  "Ben Lee",
  "Tao Sharma",
  "Liz Kaufmann",
  "James Greygoose",
  "Tim Knight",
  "Joe Trodden",
  "Kyle Semple",
  "Mell Russon",
];

const tutors = options.map((tutor) => <Option key={tutor}>{tutor}</Option>);

export default tutors;
