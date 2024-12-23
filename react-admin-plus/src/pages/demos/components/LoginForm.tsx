import { Button, Form, Select, Input } from "antd";
import { useEffect } from "react";
import { useForm, Resolver, Controller } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
  phone: string;
};

const resolver: Resolver<FormData> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
      ? {
        username: {
          type: "required",
          message: "用户名不能为空",
        },
        password: {
          type: "required",
          message: "密码不能为空",
        },
        phone: {
          type: "required",
          message: "选择项不能为空",
        },
      }
      : {},
  };
};


export function LoginForm({ formData, onSubmit }: any) {
  const { control, register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
      phone: "",
    },
    resolver,
  });

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      {/* <Controller
        name="mySelect"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Form.Item label="选择项">
            <Select {...field} allowClear>
              <Select.Option value="option1">选项1</Select.Option>
              <Select.Option value="option2">选项2</Select.Option>
            </Select>
          </Form.Item>
        )}
      /> */}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field }) => (
          <Form.Item  name="phone" rules={[{
            required: true,
            message: "手机号不能为空",
          }]} label="选择项">
            <Input
              {...field}
              placeholder="请输入手机号"
            />
          </Form.Item>
        )}
        name="phone"
      />

      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: "用户名不能为空",
          },
        ]}
      >
        <input {...register("username")} />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: "密码不能为空",
          },
        ]}
      >
        <input {...register("password")} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <label>First Name</label>
    //   <input {...register("username")} />
    //   {errors.username && <span>This is required.</span>}

    //   <label>Last Name</label>
    //   <input {...register("password")} />
    //   {errors.password && <span>This is required.</span>}
    //   <button
    //     type="submit"
    //   >
    //     登录
    //   </button>
    // </form>
  );
}