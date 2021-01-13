import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../images/soc-logo-transparent.png";

const Login = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async (values) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(values.email, values.password);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Row
      justify="end"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vh",
        backgroundPositionX: "-300px",
        backgroundPositionY: "center",
      }}
    >
      <Col
        span={24}
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Form
          onFinish={handleLogin}
          style={{
            border: "1px solid #ccc",
            width: "30vw",
            backgroundColor: "#f2f2f2",
            padding: "2rem",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: 0.95,
            boxShadow: "4px 4px 4px 0px rgba(237,237,237,1)",
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email address required",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          ​
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password required",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          ​
          <Form.Item
            style={{
              margin: "0px",
            }}
          >
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <h1
          style={{
            position: "fixed",
            bottom: "0px",
            right: "0px",
            margin: "1em",
            fontSize: "3rem",
            userSelect: "none",
            color: "#aaa",
          }}
        >
          Lecture Resources Hub
        </h1>
      </Col>
    </Row>
  );
};

export default withRouter(Login);
