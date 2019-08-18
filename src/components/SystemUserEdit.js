import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import SystemUserEditForm from './SystemUserEditForm';


export class SystemUserEdit extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            systemUser: {},
            isClosingModal: false,
            isSaving: false,
            isValidated: false,
        };
    }

    componentDidUpdate() {
        const { editUser, show } = this.props;
        if (editUser) {
            this.setState({ systemUser: editUser});
        }

        if (!show) {
            this.setState({ isSaving: false });
        }
    }

    getTitle = systemUser => {
        if (systemUser) {
            const { firstname, lastname, username } = systemUser;
            if (firstname && lastname) {
                return `${firstname} ${lastname}`;
            }
            return username;
        }

        return 'New User';
    }

    onChangeFormControl = (field, value) => {
        const { systemUser } = this.state;
        systemUser[field] = value;
        this.setState({ systemUser: {...systemUser} });
    }

    onCloseModal = () => {
        this.setState({ isValidated: false });
        this.props.onCloseModal();
    }

    onFormSubmit = event => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            const { systemUser } = this.state;
            this.setState({ isSaving : true });
            this.props.onSaveEditUser(systemUser).then(() => {
                this.setState({
                    isValidated: false,
                    systemUser: null,
                });
            });
        }

        this.setState({ isValidated: true });
    }

    render() {
        const { show } = this.props;
        const { systemUser, isSaving, isValidated } = this.state;
        const title = this.getTitle(systemUser);

        return (
            <Modal
                animation
                autoFocus
                backdrop="static"
                centered
                show={show}
                size="xl"
                onHide={this.onCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Form noValidate onSubmit={this.onFormSubmit} validated={isValidated}>
                    <Modal.Body>
                        <SystemUserEditForm
                            systemUser={systemUser}
                            onChangeFormControl={this.onChangeFormControl}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCloseModal}>Cancel</Button>
                        <Button variant="primary" type="submit">
                            {isSaving ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="statue"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">Saving...</span>
                                </>
                            ) : null}
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

SystemUserEdit.displayName = 'SystemUserEdit';

export default SystemUserEdit;
