import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import "./style.css";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";

import { Button, Input, Space, Row, Col } from "antd";

import { SearchContext } from "../../contexts/searchContext";
const { Search } = Input; //imports Search from ant.d
function HeaderBar() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const { getSearchText } = useContext(SearchContext);
  return (
    <header>
      <Row style={{ height: "30px" }}>
        <Col span={24}>
          <Link to="/">
            <img src={socLogo} alt="logo" id="soc-logo" />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={16}>
          <Search
            placeholder="input search text"
            allowClear={true}
            onSearch={(value) => getSearchText(value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col span={6}>
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
              <Link id="sign-out-button" onClick={() => app.auth().signOut()}>
                Log Out
              </Link>
            </Space>
          </nav>
        </Col>
      </Row>
    </header>
  );
}
export default HeaderBar;
