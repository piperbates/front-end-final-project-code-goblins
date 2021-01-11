import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined } from "@ant-design/icons";
import "./style.css";

import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Button, Input, Space } from "antd";
import { SearchContext } from "../../contexts/searchContext";

const { Search } = Input; //imports Search from ant.d

function HeaderBar() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const { getSearchText } = useContext(SearchContext);

  return (
    <header>
      <div id="header-content">
        <div id="logo-nav-wrapper">
          <Link to="/">
            <img src={socLogo} alt="logo" id="soc-logo" />
          </Link>
          <nav>
            <Space
              size={"large"}
              style={{ marginLeft: "16px", fontSize: "16px" }}
            >
              <Link to="/"><HomeOutlined/> Home</Link>

              {adminUsers[0].find(
                (user) => user.email === currentUser.email
              ) ? (
                <ContentManagementLink />
              ) : (
                <li style={{ display: "none" }}></li>
              )}
              <div id="search-box">
            <Search
              placeholder="input search text"
              allowClear={true}
              onSearch={(value) => getSearchText(value)}
              style={{ width: 200 }}
            />
          </div>
            </Space>
          </nav>
        </div>
        <div id="search-signout-wrapper">
          
        <Button id="sign-out-button" onClick={() => app.auth().signOut()}>Sign Out</Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
