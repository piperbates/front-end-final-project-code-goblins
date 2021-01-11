import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";

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
              <Link to="/">Home</Link>

              {adminUsers[0].find(
                (user) => user.email === currentUser.email
              ) ? (
                <ContentManagementLink />
              ) : (
                <li style={{ display: "none" }}></li>
              )}
              <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
            </Space>
          </nav>
        </div>
        <div id="search-signout-wrapper">
          <div id="search-box">
            <Search
              placeholder="input search text"
              allowClear={true}
              onSearch={(value) => getSearchText(value)}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
