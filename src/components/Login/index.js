import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../../images/soc-logo.png";

import "./style.css";

// const layout = {
//   labelCol: {
//     span: 8,
//   },
//   wrapperCol: {
//     span: 8,
//   },
// };
// const tailLayout = {
//   wrapperCol: {
//     offset: 8,
//     span: 8,
//   },
// };

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
    <div id="login">
      <img alt="logo" src={logo} id="logo"></img>
      <h1>Lecture Resources Hub</h1>
      <Form
        // {...layout}
        // name="login"
        onFinish={handleLogin}
        className="login-form"
      >
        <Form.Item
          // label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email address required",
            },
          ]}
        >
          <Input
            className="email-input"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          // label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password required",
            },
          ]}
        >
          <Input.Password
            className="password-input"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item /* {...tailLayout} */>
          <Button type="primary" htmlType="submit" className="login-button">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Login);
