import React from 'react'
import {useSelector} from 'react-redux'
import {Link}from 'react-router-dom'
import {selectAllUsers} from './UserSlice'

export const UserList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map((user, index) => (
        <li key={index}>
            <Link to={`/users`}>${user.name}</Link>
        </li>
    ))
    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}