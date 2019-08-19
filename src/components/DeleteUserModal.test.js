import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import DeleteUserModal from './DeleteUserModal';

describe('DeleteUserModal', () => {
    const stubDeleteUser = {
        firstname: 'Todd',
        lastname: 'McKinnon',
        username: 'tmckinnon',
    };

    it('renders proper elements', () => {
        const wrapper = shallow(
            <DeleteUserModal
                deleteUser={stubDeleteUser}
                show
            />
        );

        const buttons = wrapper.find('Button');

        expect(buttons.length).toBe(2);
    });

    it('calls "onCancelDelete" when cancel button is clicked', () => {
        const onCancelDeleteSpy = spy();
        const wrapper = shallow(
            <DeleteUserModal
                deleteUser={stubDeleteUser}
                onCancelDelete={onCancelDeleteSpy}
                show
            />
        );

        const buttons = wrapper.find('Button');
        buttons.at(0).simulate('click');

        expect(onCancelDeleteSpy.callCount).toBe(1);
    });

    it('calls "onConfirmDelete" when cancel button is clicked', () => {
        const onConfirmDeleteSpy = spy();
        const wrapper = shallow(
            <DeleteUserModal
                deleteUser={stubDeleteUser}
                onConfirmDelete={onConfirmDeleteSpy}
                show
            />
        );

        const buttons = wrapper.find('Button');
        buttons.at(1).simulate('click');

        expect(onConfirmDeleteSpy.callCount).toBe(1);
    });
});
