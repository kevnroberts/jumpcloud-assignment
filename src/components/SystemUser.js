import React from 'react';
import Button from 'react-bootstrap/Button';
import './SystemUser.css';

export const SystemUser = ({ systemUser, onSelectUser, onDeleteUser }) => {
    const {
        created,
        email,
        firstname,
        lastname,
        username,
    } = systemUser;
    const createdDate = created ? new Date(created).toLocaleString() : '';
    return (
        <tr className="SystemUser" onClick={onSelectUser}>
            <td></td>
            <td>
                <div className="">{firstname} {lastname}</div>
                <div>{username}</div>
            </td>
            <td>{email}</td>
            <td>{createdDate}</td>
            <td><Button variant="danger" onClick={onDeleteUser}>Delete</Button></td>
        </tr>
    );
}

export default SystemUser;
