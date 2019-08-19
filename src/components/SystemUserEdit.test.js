import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SystemUserEdit from './SystemUserEdit';

describe('SystemUserEdit', () => {
    it('renders proper elements', () => {
        const wrapper = shallow(<SystemUserEdit show />);

        expect(wrapper.find('ModalHeader').length).toBe(1);
        expect(wrapper.find('Form').length).toBe(1);
        expect(wrapper.find('ModalBody').length).toBe(1);
        expect(wrapper.find('ModalFooter').length).toBe(1);
        expect(wrapper.find('SystemUserEditForm').length).toBe(1);
        expect(wrapper.find('Button[variant="secondary"]').length).toBe(1);
        expect(wrapper.find('Button[variant="primary"]').length).toBe(1);
        expect(wrapper.find('Spinner').length).toBe(0);
    });

    it('renders a spinner when saving', () => {
        const wrapper = shallow(<SystemUserEdit show />);

        wrapper.instance().setState({ isSaving: true }, () => {
            expect(wrapper.find('Spinner').length).toBe(1);
        });
    });

    it('closes when cancel button is clicked', () => {
        const onCloseModalSpy = spy();
        const wrapper = shallow(
            <SystemUserEdit
                show
                onCloseModal={onCloseModalSpy}
            />
        );

        const cancelButton = wrapper.find('Button[variant="secondary"]');
        cancelButton.simulate('click');
        expect(onCloseModalSpy.callCount).toBe(1);
    });

    it('renders username in Title when systemUser has no firstname and lastname', () => {
        const wrapper = shallow(<SystemUserEdit show />);
        wrapper.setProps({
            editUser: {
                username: 'rajatbhargava',
            },
        });

        const title = wrapper.find('ModalTitle');
        expect(title.text()).toBe('rajatbhargava');
    });

    it('renders username in Title when systemUser has no firstname and lastname', () => {
        const wrapper = shallow(<SystemUserEdit show />);
        wrapper.setProps({
            editUser: {
                username: 'rajatbhargava',
                firstname: 'Rajat',
                lastname: 'Bhargava'
            },
        });

        const title = wrapper.find('ModalTitle');
        expect(title.text()).toBe('Rajat Bhargava');
    });

    it('validates form when it is submitted', () => {
        const checkValiditySpy = spy(() => false);
        const mockEvent = {
            currentTarget: {
                checkValidity: checkValiditySpy,
            },
            preventDefault: () => {},
            stopPropagation: () => {},
        };

        const wrapper = shallow(<SystemUserEdit show />);
        const form = wrapper.find('Form');

        form.simulate('submit', mockEvent);

        expect(checkValiditySpy.callCount).toBe(1);
        expect(wrapper.instance().state.isValidated).toBe(true);
    });

    it('saves data when form is submitted', async () => {
        const checkValiditySpy = spy(() => true);
        const onSaveEditUserSpy = spy(() => Promise.resolve());
        const mockEvent = {
            currentTarget: {
                checkValidity: checkValiditySpy,
            },
            preventDefault: () => {},
            stopPropagation: () => {},
        };
        const mockSystemUser = {
            username: 'oliviaoster',
        };

        const wrapper = shallow(<SystemUserEdit show onSaveEditUser={onSaveEditUserSpy} />);
        wrapper.instance().setState({ systemUser: mockSystemUser });

        const form = wrapper.find('Form');
        await form.simulate('submit', mockEvent);

        expect(checkValiditySpy.callCount).toBe(1);
        expect(onSaveEditUserSpy.callCount).toBe(1);
        expect(onSaveEditUserSpy.args[0][0]).toBe(mockSystemUser);
        expect(wrapper.instance().state.systemUser).toBeNull();
        expect(wrapper.instance().state.isValidated).toBe(false);
    });
});
