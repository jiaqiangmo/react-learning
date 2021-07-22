import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./UserSlice";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { fetchUsers } from '../users/UserSlice'
import store from '../../app/store'
export const UserList = (props) => {
  const users = useSelector(selectAllUsers);
  let history = useHistory();
  store.dispatch(fetchUsers())
  const handleOnClick = (e) => {
    history.push(`/users/${e.key}`);
  };
  const listItem = users.map((user, index) => (
    <Menu.Item key={user.user_name} onClick={handleOnClick} icon={<MailOutlined />}>
      {user.user_name}
    </Menu.Item>
  ));

  return (
    <section>
      <h2>All Users:</h2>
      <ul>
        <Menu mode="inline">{listItem}</Menu>
      </ul>
    </section>
  );
};
