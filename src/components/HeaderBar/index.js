import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Button, Input } from "antd";

// const { Header } = Layout;
const { Search } = Input;

function HeaderBar({ updateSearch, searchState }) {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  // const [searchField, setSearchField] = useState("");

  const onSearch = (value) => updateSearch(value);
  // const onChange = (e) => setSearchField(e.target.value);
  // useEffect(() => {
  //   //updateSearch(searchField);
  // }, [searchField]);

  return (
    <header>
      <div id="header-content">
        <div id="logo-nav-wrapper">
          <Link to="/">
            <img src={socLogo} alt="logo" id="soc-logo" />
          </Link>
          <nav>
            <ul>
              <li>Tutorials</li>
              <li>Lectures</li>
              {adminUsers[0].find(
                (user) => user.email === currentUser.email
              ) ? (
                <ContentManagementLink />
              ) : (
                <li style={{ display: "none" }}></li>
              )}
            </ul>
          </nav>
        </div>
        <div id="search-signout-wrapper">
          <div id="search-box">
            <Search
              allowClear={true}
              placeholder="input search text"
              // onChange={onChange}
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <Button
            onClick={() => app.auth().signOut()}
            style={{
              background: "#31986A",
              borderRadius: "10px",
              height: "50px",
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
