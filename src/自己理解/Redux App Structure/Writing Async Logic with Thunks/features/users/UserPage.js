import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersByUserName, putUsersByUserName } from "../users/UserSlice";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";

export const UserPage = ({ match }) => {
  const user = useSelector((state) => state.users.user);
  console.log("user:", user);

  const dispatch = useDispatch();
  const history = useHistory();
  //获得路由参数
  const { userId } = match.params;
  //挂载组件时候获得状态管理中的user数据
  //这个放在userEffect里请求为什么会无限次请求接口?
  useEffect(() => {
    dispatch(fetchUsersByUserName({ userName: userId }));
    // eslint-disable-next-line
  }, []);
  //点击按钮确定修改个人用户信息
  const onFinish = (values) => {
    let params = Object.assign({userId},values)   
    dispatch(putUsersByUserName(params))
    console.log("Success:", values);
    // history.goBack();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //给表单赋值
  return (
    <section>
      <>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="用户名"
            name="user_name"
            rules={[
              {
                required: true,
                message: "Please input your user_name!",
              },
            ]}
            initialValue={user.user_name || '0'}
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="IP地址"
            name="ip_address"
            rules={[
              {
                required: true,
                message: "Please input your ip_address!",
              },
            ]}
            initialValue={user.ip_address || '0'}

          >
            <Input />
          </Form.Item>
          <Form.Item
            label="头像地址"
            name="avatar_url"
            rules={[
              {
                required: true,
                message: "Please input your avatar_url!",
              },
            ]}
            initialValue={user.avatar_url || '0'}

          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </>
    </section>
  );
};
