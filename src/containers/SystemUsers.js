import React from 'react';
import {
    createSystemUser,
    deleteSystemUser,
    getSystemUser,
    getSystemUserList,
    updateSystemUser,
} from '../api/api';
import SystemUserList from '../components/SystemUserList';
import AddSystemUser from '../components/AddSystemUser';

const PAGE_SIZE = 10;

export class SystemUsers extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            currentPage: 1,
            selectedUser: null,
            showUserEdit: false,
            showDeleteWarning: false,
            systemUserCount: 0,
            systemUsers: [],
        };

        this.getUserList();
    }

    getUserList = (page) => {
        const { currentPage } = this.state;
        getSystemUserList(page || currentPage, PAGE_SIZE).then(response => {
            const { totalCount, results } = response;
            this.setState({
                systemUserCount: totalCount,
                systemUserList: results,
            });
        });
    }

    onChangePage = page => {
        const { currentPage } = this.state;
        if (page !== currentPage) {
            this.setState({ currentPage: page });
            this.getUserList(page);
        }
    }

    onCreateSystemUser = user => {
        return createSystemUser(user).then(() => {
            this.getUserList();
        });
    }

    onDeleteSystemUser = id => {
        return deleteSystemUser(id).then(() => {
            this.getUserList();
        });
    }

    onGetSystemUser = id => {
        return getSystemUser(id).then(response => {
            this.setState({ selectedUser: response });
        })
    }

    onUpdateSystemUser = user => {
        return updateSystemUser(user).then(() => {
            this.getUserList();
        });
    }

    render() {
        const {
            currentPage,
            selectedUser,
            systemUserCount,
            systemUserList,
        } = this.state;

        return (
            <>
                <AddSystemUser
                    onCreateSystemUser={this.onCreateSystemUser}
                />
                <SystemUserList
                    currentPage={currentPage}
                    onChangePage={this.onChangePage}
                    onDeleteSystemUser={this.onDeleteSystemUser}
                    onGetSystemUser={this.onGetSystemUser}
                    onUpdateSystemUser={this.onUpdateSystemUser}
                    pageSize={PAGE_SIZE}
                    selectedUser={selectedUser}
                    systemUserCount={systemUserCount}
                    systemUserList={systemUserList}
                />
            </>
        );
    }
}

SystemUsers.displayName = 'SystemUsers';

export default SystemUsers;
