import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import AddSystemUser from './AddSystemUser';

describe('AddSystemUser', () => {

    it('renders proper elements', () => {
        const wrapper = shallow(<AddSystemUser />);

        expect(wrapper.find('Button').length).toBe(1);
        expect(wrapper.find('SystemUserEdit').length).toBe(1);
    });

    it('sets "showModal" to true when add button is clicked', () => {
        const wrapper = shallow(<AddSystemUser />);

        expect(wrapper.instance().state.showModal).toBe(false);

        const buttons = wrapper.find('Button');
        buttons.at(0).simulate('click');

        expect(wrapper.instance().state.showModal).toBe(true);
    });

    it('sets "showModal" to true when add button is clicked', async () => {
        const onCreateSystemUserSpy = spy(() => Promise.resolve());
        const wrapper = shallow(<AddSystemUser onCreateSystemUser={onCreateSystemUserSpy} />);

        await wrapper.instance().onSaveNewUser({
            username: 'kevinroberts',
            organization: 'JumpCloud',
        });

        expect(wrapper.instance().state.showModal).toBe(false);
        expect(onCreateSystemUserSpy.callCount).toBe(1);
    });
});
