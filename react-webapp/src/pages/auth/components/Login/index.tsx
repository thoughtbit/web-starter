import { useCallback, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd-mobile";
import { LockOutline, CollectMoneyOutline, UserOutline } from 'antd-mobile-icons'
import { useCountDown, useRoute } from "@/hooks";

import "./index.scss";

const Login: React.FC = () => {
  const { navigate } = useRoute();
  const [form] = Form.useForm();
  const { countdown, setupCountdown } = useCountDown(60);
  const [loginType, changeLoginType] = useState("password");

  const onFinish = useCallback((values: any) => {
  
    console.log("Submit: ", values);
    navigate("/dashboard");
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const switchType = (val: string) => {
    form.resetFields();
    changeLoginType(val);
  };

  return (
    <Form
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {loginType === "password" && (
        <>
          <Form.Item name="username" rules={[{ required: true, message: "账号必填" }]}>
            <Input size="large" prefix={<UserOutline className="form-item-icon" />} placeholder="请输入账号" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "密码必填" }]} hasFeedback>
            <Input.Password
              size="large"
              prefix={<LockOutline className="form-item-icon" />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item className="form-item-remember">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={onChange}>记住密码</Checkbox>
            </Form.Item>
            <Button type="link" htmlType="button" className="login-form-forgot">
              忘记账号?
            </Button>
          </Form.Item>
        </>
      )}

      {loginType === "phone" && (
        <>
          <Form.Item name="username" rules={[{ required: true, message: "手机号必填" }]}>
            <Input size="large" prefix={<UserOutline className="form-item-icon" />} placeholder="请输入账号" />
          </Form.Item>

          <Form.Item className="form-item-captcha">
            <Form.Item name="captcha" noStyle rules={[{ required: true, message: "验证码必填" }]}>
              <Input size="large" prefix={<CollectMoneyOutline className="form-item-icon" />} placeholder="请输入验证码" />
            </Form.Item>

            <Button
              size="large"
              disabled={countdown > 0}
              onClick={setupCountdown}
              className="register-form-captcha-btn"
            >
              {countdown === 0 ? "发送验证码" : `${countdown}秒后可重发`}
            </Button>
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large" className="login-form-button">
          登录
        </Button>
      </Form.Item>
      <div className="switch-container">
        {loginType !== "password" && (
          <span className="tip" onClick={() => switchType("password")}>
            使用账号密码登录
          </span>
        )}
        {loginType !== "phone" && (
          <span className="tip" onClick={() => switchType("phone")}>
            使用手机号登录
          </span>
        )}
      </div>
    </Form>
  );
};

export default Login;
