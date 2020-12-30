import React from "react";
import { Layout } from "antd";
import socLogo from "../../soc-logo.png";
import { Input } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

const { Search } = Input;
const onSearch = (value) => console.log(value);

function HeaderBar() {
  return (
    <Header>
      <div id="header">
        <Link to="/">
          <img src={socLogo} alt="logo" id="soc-logo" />
        </Link>
        <nav>
          <ul>
            <li>Tutorials</li>
            <li>Lectures</li>
          </ul>
        </nav>
        <div id="search-box">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
      </div>
    </Header>
  );
}

export default HeaderBar;
