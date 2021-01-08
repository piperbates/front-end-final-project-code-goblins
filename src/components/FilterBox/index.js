import React, { useState } from "react";
import "./style.css";
import TagFilter from "../TagFilter";
import TagDropdown from "../TagDropdown";

function FilterBox() {
    const tags = ["Front End",
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
    "Next.js"];

const lecturers = [
    "Ben", "Chris", "Tao"
]
// const weeks = [
   
// ]

// let lengthOfBootcamp = 16;

// for(let i=1; i < lengthOfBootcamp + 1; i++){
//     weeks.push(`Week ${i}`)
// }

const [searchObj, setSearchObj] = useState({})
function setSearchData(array){
    //Sets the search data to the search
    console.log(array)
    
}

  return (
    <>
      <div id="filter-box">
        <TagFilter text="Tags" setSearchData={setSearchData} data={tags}/>
        {/* <TagFilter setSearchData={setSearchData} text="Weeks" data={weeks}/> */}
        
        <TagDropdown />
        
        <TagFilter setSearchData={setSearchData} text="Lecturer" data={lecturers}/>
      </div>
    </>
  );
}

// const FilterBox = new HotTags();

// ReactDOM.render(<HotTags />, document.getElementById('container'));
export default FilterBox;
