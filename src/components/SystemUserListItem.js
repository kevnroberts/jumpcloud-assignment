import React from 'react';
import Button from 'react-bootstrap/Button';
import './SystemUserListItem.css';

export const SystemUserListItem = ({ systemUser, onSelectUser, onDeleteUser }) => {
    const {
        created,
        email,
        firstname,
        lastname,
        username,
    } = systemUser || {};
    const createdDate = created ? new Date(created).toLocaleString() : '';
    const name = firstname && lastname ? (
        <><span className="SystemUserListItem-name">{firstname} {lastname}</span> {username}</>
    ) : (
        <span className="SystemUserListItem-name">{username}</span>
    );

    return (
        <tr className="SystemUserListItem" onClick={onSelectUser}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{createdDate}</td>
            <td className="SystemUserListItem-delete"><Button variant="danger" size="sm" onClick={onDeleteUser}>Delete</Button></td>
        </tr>
    );
}

export default SystemUserListItem;
