import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { fetchUsersByUserName } from "../users/UserSlice";
import store from "../../app/store";
import { Form, Input, Button } from "antd";

export const UserPage = ({ match }) => {
  const [form] = Form.useForm();
  //获得路由参数
  const { userId } = match.params;
  //挂载组件时候获得状态管理中的user数据
  //这个放在userEffect里请求为什么会无限次请求接口?
  useEffect(() => {
    const response = store.dispatch(fetchUsersByUserName({ userName: userId }));
    console.log("请求fetchUsersByUserName:", response);
  });
  // const response = store.dispatch(fetchUsersByUserName({ userName: userId }));
  // console.log("请求fetchUsersByUserName:", response);
  return (
    <section>
      <>
        <Form form={form}>
          <Form.Item label="用户名">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="IP地址">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="头像">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">修改</Button>
          </Form.Item>
        </Form>
      </>
    </section>
  );
};
