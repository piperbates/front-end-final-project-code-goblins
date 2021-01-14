import React, { useContext } from "react";
import { Link } from "react-router-dom";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Input, Space, Row, Button } from "antd";
import { SearchContext } from "../../contexts/searchContext";

const { Search } = Input; //imports Search from ant.d
function HeaderBar() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const { getSearchText } = useContext(SearchContext);
  return (
    <Row
      style={{
        height: "120px",
        backgroundColor: "#f2f2f2",
        marginBottom: "32px",
        boxShadow: "0px 3px 15px -5px rgba(140,140,140,1)",
      }}
      align="middle"
      justify="space-between"
    >
      <Space>
        <Link to="/">
          <img
            src={socLogo}
            alt="logo"
            style={{ marginLeft: "32px", width: "90px" }}
          />
        </Link>
        <Search
          placeholder="input search text"
          allowClear={true}
          onSearch={(value) => getSearchText(value)}
          style={{ width: 200 }}
        />
      </Space>
      <Space style={{ marginRight: "32px" }} size="large">
        <Link to="/" style={{ color: "#000" }}>
          Home
        </Link>

        {adminUsers[0].find((user) => user.email === currentUser.email) ? (
          <ContentManagementLink />
        ) : (
          <></>
        )}

        <Button type="primary" onClick={() => app.auth().signOut()}>
          Log Out
        </Button>
      </Space>
    </Row>
  );
}
export default HeaderBar;
