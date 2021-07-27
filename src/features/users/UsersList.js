import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { fetchUsers } from '../users/UserSlice'
export const UserList = (props) => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch()
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchUsers())
     // eslint-disable-next-line
  },[]);
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