import React from 'react';
import Table from 'react-bootstrap/Table'
import { getSystemUserList, deleteSystemUser } from '../api/api';
import DeleteUserModal from './DeleteUserModal';
import SystemUser from './SystemUser';
import SystemUserEdit from './SystemUserEdit';

export class SystemUserList extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            systemUserCount: 0,
            systemUserList: [],
            showDeleteWarning: false,
        };

        this.getUserList();
    }

    getUserList = () => {
        getSystemUserList().then(response => {
            const { totalCount, results } = response;
            this.setState({
                systemUserCount: totalCount,
                systemUserList: results,
            });
        });
    }

    onCloseDeleteWarning = () => {
        this.setState({
            showDeleteWarning: false,
            deleteUser: null
        });
    }

    onCloseEdit = () => {
        this.setState({ selectedUserId: null });
    }

    onConfirmDelete = id => {
        this.onCloseDeleteWarning();
        deleteSystemUser(id).then(() => {
            this.getUserList();
        });
    }

    onDeleteUser = user => {
        this.setState({
            showDeleteWarning: true,
            deleteUser: user,
        });
    }

    onSelectUser = (event, id) => {
        const { target } = event || {};
        const { textContent, tagName } = target || {};
        if (tagName !== 'BUTTON' && textContent !== 'Delete') {
            this.setState({ selectedUserId: id });
        }
    }

    render() {
        const {
            selectedUserId,
            systemUserCount,
            systemUserList,
            showDeleteWarning,
            deleteUser = {},
        } = this.state;
        return (
            <div className="SystemUserList">
                <div className="SystemUserList-count">Total Users: {systemUserCount}</div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {systemUserList.map(systemUser => (
                            <SystemUser
                                systemUser={systemUser}
                                onSelectUser={event => { this.onSelectUser(event, systemUser.id) }}
                                key={systemUser.id}
                                onDeleteUser={() => { this.onDeleteUser(systemUser) }}
                            />
                        ))}
                    </tbody>
                </Table>
                {selectedUserId ? (<SystemUserEdit id={selectedUserId} onCloseModal={this.onCloseEdit} />) : null}
                <DeleteUserModal
                    deleteUser={deleteUser}
                    onConfirmDelete={() => this.onConfirmDelete(deleteUser.id)}
                    onCancelDelete={this.onCloseDeleteWarning}
                    show={showDeleteWarning}
                />
            </div>
        );
    }
}


SystemUserList.displayName = 'SystemUserList';

export default SystemUserList;
