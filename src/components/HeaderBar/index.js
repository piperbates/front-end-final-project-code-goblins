import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Button, Input } from "antd";
import { SearchContext } from "../../contexts/searchContext";

// const { Header } = Layout;
const { Search } = Input;

function HeaderBar() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const { search } = useContext(SearchContext);

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
              placeholder="input search text"
              allowClear={true}
              onSearch={(value) => search(value)}
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
