import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { getSystemUser, updateSystemUser } from '../api/api';
import SystemUserEditForm from './SystemUserEditForm';

const propTypes = {
    id: PropTypes.string,
    onCloseModal: PropTypes.func,
};

const defaultProps = {
    id: '',
    onCloseModal: () => {},
};

export class SystemUserEdit extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            systemUser: null,
            isClosingModal: false,
            isSaving: false,
        };

        this.getUserData();
    }

    componentDidUpdate() {
        const { id } = this.props;
        const { isClosingModal = false, showModal = false } = this.state;

        if (!showModal && !isClosingModal && id) {
            this.getUserData();
        }
    }

    getUserData = () => {
        const { id } = this.props;
        getSystemUser(id).then(response => {
            this.setState({
                systemUser: response,
                showModal: true,
            });
        });
    }

    closeModal = () => {
        this.setState({ showModal: false, isClosingModal: true });
    }

    updateUser = () => {
        const { systemUser } = this.state;
        this.setState({ isSaving : true });
        updateSystemUser(systemUser).then(response => {
            this.setState({ isSaving: false });
            this.closeModal();
        })
    }

    onChangeFormControl = (field, value) => {
        const { systemUser } = this.state;
        systemUser[field] = value;
        this.setState({ systemUser: {...systemUser} });
    }

    render() {
        const { onCloseModal } = this.props;
        const { systemUser, showModal, isSaving } = this.state;
        const { firstname, lastname } = systemUser || {};
        return (
            <Modal
                animation
                autoFocus
                backdrop="static"
                centered
                show={showModal}
                size="xl"
                onHide={this.closeModal}
                onExited={onCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{firstname} {lastname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SystemUserEditForm systemUser={systemUser} onChangeFormControl={this.onChangeFormControl} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
                    <Button variant="primary" onClick={this.updateUser}>
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
            </Modal>
        );
    }
}

SystemUserEdit.propTypes = propTypes;
SystemUserEdit.defaultProps = defaultProps;
SystemUserEdit.displayName = 'SystemUserEdit';

export default SystemUserEdit;
