import React, { useContext } from "react";
import { Link } from "react-router-dom";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Button, Layout, Input } from "antd";

const { Header } = Layout;
const { Search } = Input;
const onSearch = (value) => console.log(value);

function HeaderBar() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);

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
            {adminUsers[0].find((user) => user.email === currentUser.email) ? (
              <ContentManagementLink />
            ) : (
              <li style={{ display: "none" }}></li>
            )}
          </ul>
        </nav>
        <div id="search-box">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
        <Button onClick={() => app.auth().signOut()}>Sign Out</Button>
      </div>
    </Header>
  );
}

export default HeaderBar;
