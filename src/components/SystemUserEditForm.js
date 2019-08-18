import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export const SystemUserEditForm = ({
    systemUser,
    onChangeFormControl,
}) => {
    const {
        created,
        email,
        firstname,
        middlename,
        lastname,
        username,
        displayname,
        description,
    } = systemUser || {};

    const onChange = field => (event => onChangeFormControl(field, event.target.value));

    return (
        <>
            <h3>User Information</h3>
            <Form.Row>
                <Col>
                    <Form.Group controlId="first-name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstname} onChange={onChange('firstname')} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="middle-name">
                        <Form.Label>Middle Name</Form.Label>
                        <Form.Control type="text" value={middlename} onChange={onChange('middlename')} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="last-name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastname} onChange={onChange('lastname')} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="username">
                        <Form.Label>* Userame</Form.Label>
                        <Form.Control
                            onChange={onChange('username')}
                            required
                            type="text"
                            value={username}
                        />
                        <Form.Control.Feedback type="invalid">* Username is required.</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="display-name">
                        <Form.Label>Dispay Name</Form.Label>
                        <Form.Control type="text" value={displayname} onChange={onChange('displayname')} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="last-name">
                        <Form.Label>User Creation Date</Form.Label>
                        <Form.Control type="text" readOnly value={created} onChange={onChange('created')} />
                    </Form.Group>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="company-email">
                        <Form.Label>* Company Email</Form.Label>
                        <Form.Control
                            onChange={onChange('email')}
                            required
                            type="email"
                            value={email}
                        />
                        <Form.Control.Feedback type="invalid">* Please enter a valid email address.</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col></Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Group controlId="company-email">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={onChange('description')} />
                    </Form.Group>
                </Col>
            </Form.Row>
        </>
    );
}

export default SystemUserEditForm;
