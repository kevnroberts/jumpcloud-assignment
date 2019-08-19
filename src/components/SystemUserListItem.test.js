import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import SystemUserListItem from './SystemUserListItem';

describe('SystemUserListItem', () => {
    it('renders proper elements', () => {
        const mockSystemUser = {
            created: '1989-12-19T18:29:51.007Z',
            email: 'test@example.com',
            firstname: 'Scott',
            lastname: 'Nusz',
            username: 'snooze',
            };
        const wrapper = shallow(
            <SystemUserListItem
                systemUser={mockSystemUser}
            />
        );

        const tableCells = wrapper.find('td');

        expect(tableCells.length).toBe(4);
        expect(tableCells.at(0).text()).toBe('Scott Nusz snooze');
        expect(tableCells.at(1).text()).toBe('test@example.com');
        expect(tableCells.at(2).text()).toBe('12/19/1989, 11:29:51 AM');
        expect(wrapper.find('Button[variant="danger"]').length).toBe(1);
    });
});
