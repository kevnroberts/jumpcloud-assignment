import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SystemUserList from './SystemUserList';

describe('SystemUserList', () => {
    it('renders proper elements', () => {
        const wrapper = shallow(<SystemUserList />);

        expect(wrapper.find('.SystemUserList-count').length).toBe(1);
        expect(wrapper.find('.SystemUserList-count').text()).toBe('Total Users: 0');
        expect(wrapper.find('ListPagination').length).toBe(1);
        expect(wrapper.find('SystemUserEdit').length).toBe(1);
        expect(wrapper.find('DeleteUserModal').length).toBe(1);
    });

    it('renders a table row for every systemUser', () => {
        const mockSystemUserList = [
            { id: 1 },
            { id: 2 },
        ];
        const wrapper = shallow(
            <SystemUserList
                systemUserCount={2}
                systemUserList={mockSystemUserList}
            />
        );

        expect(wrapper.find('SystemUserListItem').length).toBe(2);
    })
});
