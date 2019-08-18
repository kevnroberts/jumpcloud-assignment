import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteUserModal = ({
    deleteUser,
    onConfirmDelete,
    onCancelDelete,
    show,
}) => {
    const {
        firstname,
        lastname,
        username,
    } = deleteUser || {};

    return (
        <Modal
            animation
            autoFocus
            backdrop
            centered
            show={show}
        >
            <Modal.Header>
                <Modal.Title>Delete {firstname} {lastname}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you would like to delete <span className="">{firstname} {lastname} ({username})?</span></p>
                <p>Deletion will permanently remove all User data and associations. This action may not be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancelDelete}>Cancel</Button>
                <Button variant="danger" onClick={onConfirmDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteUserModal;
