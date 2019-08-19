import React from 'react';
import Table from 'react-bootstrap/Table'
import DeleteUserModal from './DeleteUserModal';
import ListPagination from './ListPagination';
import SystemUserListItem from './SystemUserListItem';
import SystemUserEdit from './SystemUserEdit';

export class SystemUserList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showUserEdit: false,
            showDeleteWarning: false,
        };
    }

    onCloseDeleteWarning = () => {
        this.setState({
            deleteUser: null,
            showDeleteWarning: false,
        });
    }

    onCloseEdit = () => {
        this.setState({
            editUser: null,
            showUserEdit: false,
        });
    }

    onConfirmDelete = id => {
        this.onCloseDeleteWarning();
        this.props.onDeleteSystemUser(id);
    }

    onDeleteUser = user => {
        this.setState({
            showDeleteWarning: true,
            deleteUser: user,
        });
    }

    onSaveEditUser = user => {
        return this.props.onUpdateSystemUser(user).then(() => {
            this.setState({ showUserEdit: false });
        });
    }

    onSelectUser = (event, id) => {
        const { target } = event || {};
        const { textContent, tagName } = target || {};
        if (tagName !== 'BUTTON' && textContent !== 'Delete') {
            this.props.onGetSystemUser(id).then(() => {
                this.setState({ showUserEdit: true });
            });
        }
    }

    render() {
        const {
            deleteUser = {},
            showDeleteWarning,
            showUserEdit,
        } = this.state;
        const {
            currentPage,
            onChangePage,
            pageSize,
            selectedUser = {},
            systemUserCount = 0,
            systemUserList,
        } = this.props;

        return (
            <div className="SystemUserList">
                <div className="SystemUserList-count">Total Users: {systemUserCount}</div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(systemUserList) ? (
                            systemUserList.map(systemUser => (
                                <SystemUserListItem
                                    systemUser={systemUser}
                                    onSelectUser={event => { this.onSelectUser(event, systemUser.id) }}
                                    key={systemUser.id}
                                    onDeleteUser={() => { this.onDeleteUser(systemUser) }}
                                />
                            ))
                        ) : null}
                    </tbody>
                </Table>
                <ListPagination
                    systemUserCount={systemUserCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                />
                <SystemUserEdit
                    editUser={selectedUser}
                    onCloseModal={this.onCloseEdit}
                    onSaveEditUser={this.onSaveEditUser}
                    show={showUserEdit}
                />
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
