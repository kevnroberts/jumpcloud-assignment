import React from 'react';
import Button from 'react-bootstrap/Button';
import SystemUserEdit from './SystemUserEdit';

export class AddSystemUser extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    onAddNewUser = () => {
        this.setState({ showModal: true });
    }

    onCloseModal = () => {
        this.setState({ showModal: false });
    }

    onSaveNewUser = user => {
        return this.props.onCreateSystemUser(user)
        .then(() => {
            this.onCloseModal();
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        const { showModal } = this.state;
        return (
            <>
                <Button
                    variant="primary"
                    title="Add New User"
                    onClick={this.onAddNewUser}
                >+ Add</Button>
                <SystemUserEdit
                    onCloseModal={this.onCloseModal}
                    onSaveEditUser={this.onSaveNewUser}
                    show={showModal}
                    systemUser={null}
                />
            </>
        );
    }
}

export default AddSystemUser;
