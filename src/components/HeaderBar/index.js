import React, { useContext } from "react";
import { Button, Layout } from "antd";
import socLogo from "../../soc-logo.png";
import { Input } from "antd";
import { Link } from "react-router-dom";
import app from "../../firebase/Base";
import ContentManagementLink from "../ContentManagementLink";
import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
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
