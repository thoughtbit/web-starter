import { useCallback, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd-mobile";
import { LockOutline, CollectMoneyOutline, UserOutline } from 'antd-mobile-icons'

import { useCountDown, useRoute } from "@/hooks";

import "./index.scss";

const Register: React.FC = () => {
  const { navigate } = useRoute();
  const [form] = Form.useForm();
  const [registerType, changeRegisterType] = useState("phone");
  const { countdown, setupCountdown } = useCountDown(60);

  const onFinish = useCallback((values: any) => {
    console.log("Submit: ", values);
    navigate("/login");
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const switchType = (val: string) => {
    form.resetFields();
    changeRegisterType(val);
  };

  return (
    <Form
      form={form}
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {registerType === "phone" && (
        <>
          <Form.Item name="username" rules={[{ required: true, message: "手机号必填" }]}>
            <Input size="large" prefix={<UserOutline className="form-item-icon" />} placeholder="请输入账号" />
          </Form.Item>
        </>
      )}
      {registerType === "email" && (
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "邮箱必填" },
            { required: true, message: "请输入正确的邮箱" },
          ]}
        >
          <Input type="text" size="large" placeholder="请输入您的邮箱" />
        </Form.Item>
      )}

      <Form.Item name="password" rules={[{ required: true, message: "密码必填" }]} hasFeedback>
        <Input.Password
          size="large"
          prefix={<LockOutline className="form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>

      {registerType === "phone" && (
        <>
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

      <Form.Item className="form-item-agreement">
        <Form.Item
          name="agreement"
          valuePropName="checked"
          noStyle
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error("请先阅读并同意协议")),
            },
          ]}
        >
          <Checkbox onChange={onChange}>我已阅读并同意 </Checkbox>
        </Form.Item>
        <p className="tip">
          <a href="#">服务协议</a> 和 <a href="#">隐私声明</a>
        </p>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block size="large" className="register-form-button">
          登录
        </Button>
      </Form.Item>

      <div className="switch-container">
        <span className="tip" onClick={() => switchType(registerType === "phone" ? "email" : "phone")}>
          {registerType === "phone" ? "使用邮箱注册" : "使用手机号注册"}
        </span>
      </div>
    </Form>
  );
};

export default Register;
